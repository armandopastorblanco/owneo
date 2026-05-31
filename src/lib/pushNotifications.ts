import { supabase } from "@/integrations/supabase/client";

const SW_PATH = "/service-worker.js";

function isPreviewOrIframe(): boolean {
  try {
    if (window.self !== window.top) return true;
  } catch {
    return true;
  }
  const host = window.location.hostname;
  return host.includes("id-preview--") || host.includes("lovableproject.com");
}

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = window.atob(base64);
  const output = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; ++i) output[i] = raw.charCodeAt(i);
  return output;
}

export async function registerPushServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (typeof window === "undefined") return null;
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) return null;
  if (isPreviewOrIframe()) return null;

  try {
    const existing = await navigator.serviceWorker.getRegistration(SW_PATH);
    if (existing) return existing;
    return await navigator.serviceWorker.register(SW_PATH);
  } catch (err) {
    console.error("[push] SW registration failed", err);
    return null;
  }
}

export async function subscribeAdminToPush(): Promise<boolean> {
  if (typeof window === "undefined") return false;
  if (!("serviceWorker" in navigator) || !("PushManager" in window) || !("Notification" in window)) {
    return false;
  }
  if (isPreviewOrIframe()) return false;

  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") return false;

    const registration = await registerPushServiceWorker();
    if (!registration) return false;
    await navigator.serviceWorker.ready;

    // Fetch VAPID public key from edge function (stored as Supabase secret)
    const { data, error } = await supabase.functions.invoke("get-vapid-public-key");
    if (error || !data?.publicKey) {
      console.error("[push] could not fetch VAPID public key", error);
      return false;
    }

    let subscription = await registration.pushManager.getSubscription();
    if (!subscription) {
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(data.publicKey),
      });
    }

    const payload = subscription.toJSON();
    const { error: insertError } = await supabase
      .from("admin_push_subscriptions")
      .insert({ subscription: payload as any });

    if (insertError) {
      // Likely duplicate — non-fatal
      console.warn("[push] could not save subscription", insertError.message);
    }

    return true;
  } catch (err) {
    console.error("[push] subscribeAdminToPush failed", err);
    return false;
  }
}
