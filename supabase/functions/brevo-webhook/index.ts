// Brevo webhook receiver: keeps public.suppressed_emails in sync with Brevo.
// Append-only: we INSERT suppressions, never DELETE existing rows.
//
// Reason mapping (Brevo event -> suppressed_emails.reason):
//   unsubscribed / list_removal / contact_deleted -> unsubscribe
//   hard_bounce / blocked / invalid_email         -> bounce
//   spam / complaint                              -> complaint
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const REASON_BY_EVENT: Record<string, "unsubscribe" | "bounce" | "complaint"> = {
  unsubscribe: "unsubscribe",
  unsubscribed: "unsubscribe",
  list_addition_removal: "unsubscribe",
  contact_deleted: "unsubscribe",
  contact_updated_unsubscribe: "unsubscribe",
  hard_bounce: "bounce",
  hardBounce: "bounce",
  blocked: "bounce",
  invalid_email: "bounce",
  error: "bounce",
  spam: "complaint",
  complaint: "complaint",
};

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") return json({ error: "Invalid JSON body" }, 400);

    const event = String(body.event ?? body.type ?? "").trim();
    const email = String(body.email ?? body["contact_email"] ?? "").trim().toLowerCase();

    if (!email.includes("@")) return json({ error: "Invalid email" }, 400);

    const reason = REASON_BY_EVENT[event];
    if (!reason) {
      // Not a suppression event (delivered, opened, click...) -> ignore silently.
      return json({ ok: true, ignored: event });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { persistSession: false } },
    );

    const { error } = await supabase
      .from("suppressed_emails")
      .upsert(
        { email, reason, metadata: { source: "brevo_webhook", event, payload: body } },
        { onConflict: "email", ignoreDuplicates: true },
      );

    if (error) {
      console.error("suppressed_emails insert failed", error);
      return json({ error: "Insert failed", details: error.message }, 500);
    }

    return json({ ok: true, email, reason });
  } catch (err) {
    console.error("brevo-webhook error", err);
    return json({ error: "Internal error" }, 500);
  }
});
