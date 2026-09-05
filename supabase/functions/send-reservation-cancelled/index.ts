import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";
import { owneoEmailTemplate, ctaButton, sendEmail, jsonResponse, corsHeaders, SITE_URL } from "../_shared/email-template.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const { reservation_id } = await req.json();
    if (!reservation_id) return jsonResponse({ error: "reservation_id required" }, 400);
    const supa = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const { data: r } = await supa.from("reservations").select("user_id, car_id, start_date, end_date").eq("id", reservation_id).maybeSingle();
    if (!r) return jsonResponse({ error: "not found" }, 404);
    const [{ data: profile }, { data: car }] = await Promise.all([
      supa.from("profiles").select("email, name").eq("id", r.user_id).maybeSingle(),
      supa.from("cars").select("name").eq("id", r.car_id).maybeSingle(),
    ]);
    if (!profile?.email) return jsonResponse({ ok: true });
    const fmt = (d: string) => new Date(d).toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" });
    const body = `
      <p style="margin:0 0 16px 0;">Hola${profile.name ? ` ${profile.name}` : ""},</p>
      <p style="margin:0 0 16px 0;">Te confirmamos que tu reserva ha sido <strong style="color:#bda095;">cancelada</strong>.</p>
      <p style="margin:0 0 8px 0;"><strong>Vehículo:</strong> ${car?.name || "—"}</p>
      <p style="margin:0 0 8px 0;"><strong>Fechas originales:</strong> ${fmt(r.start_date)} → ${fmt(r.end_date)}</p>
      <p style="margin:16px 0;">Los créditos correspondientes han sido <strong style="color:#bda095;">reembolsados a tu cuenta</strong>.</p>
      ${ctaButton("Volver a reservar", `${SITE_URL}/dashboard`)}
    `;
    const html = owneoEmailTemplate("Tu reserva ha sido cancelada", "Tus créditos han sido reembolsados", body);
    const sr = await sendEmail({ to: profile.email, subject: "Tu reserva ha sido cancelada — OWNEO", html });
    return jsonResponse({ ok: sr.ok });
  } catch (e) {
    console.error(e);
    return jsonResponse({ error: String(e) }, 500);
  }
});
