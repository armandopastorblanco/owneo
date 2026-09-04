import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";
import { owneoEmailTemplate, ctaButton, sendEmail, jsonResponse, corsHeaders, SITE_URL } from "../_shared/email-template.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const { reservation_id } = await req.json();
    if (!reservation_id) return jsonResponse({ error: "reservation_id required" }, 400);
    const supa = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const { data: r } = await supa.from("reservations").select("user_id, car_id, start_date, end_date, rejection_reason").eq("id", reservation_id).maybeSingle();
    if (!r) return jsonResponse({ error: "not found" }, 404);
    const [{ data: profile }, { data: car }] = await Promise.all([
      supa.from("profiles").select("email, first_name").eq("id", r.user_id).maybeSingle(),
      supa.from("cars").select("name").eq("id", r.car_id).maybeSingle(),
    ]);
    if (!profile?.email) return jsonResponse({ ok: true });
    const fmt = (d: string) => new Date(d).toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" });
    const reason = (r as any).rejection_reason || "Las fechas solicitadas no están disponibles.";
    const body = `
      <p style="margin:0 0 16px 0;">Hola${profile.first_name ? ` ${profile.first_name}` : ""},</p>
      <p style="margin:0 0 16px 0;">Lamentamos comunicarte que tu reserva no ha podido ser confirmada.</p>
      <p style="margin:0 0 8px 0;"><strong>Vehículo:</strong> ${car?.name || "—"}</p>
      <p style="margin:0 0 8px 0;"><strong>Fechas solicitadas:</strong> ${fmt(r.start_date)} → ${fmt(r.end_date)}</p>
      <div style="border-left:2px solid #bda095;padding:12px 16px;margin:16px 0;background:rgba(189,160,149,0.05);">
        <p style="margin:0;color:#cccccc;font-style:italic;white-space:pre-wrap;">${String(reason).replace(/</g, "&lt;")}</p>
      </div>
      <p style="margin:16px 0;">Te invitamos a elegir otras fechas desde tu panel.</p>
      ${ctaButton("Buscar nuevas fechas", `${SITE_URL}/dashboard`)}
    `;
    const html = owneoEmailTemplate("Actualización sobre tu reserva", "Información sobre tu reserva OWNEO", body);
    const sr = await sendEmail({ to: profile.email, subject: "Actualización sobre tu reserva — OWNEO", html });
    return jsonResponse({ ok: sr.ok });
  } catch (e) {
    console.error(e);
    return jsonResponse({ error: String(e) }, 500);
  }
});
