import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";
import { owneoEmailTemplate, ctaButton, sendEmail, jsonResponse, corsHeaders, ADMIN_EMAIL, SITE_URL } from "../_shared/email-template.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const { reservation_id } = await req.json();
    if (!reservation_id) return jsonResponse({ error: "reservation_id required" }, 400);
    const supa = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const { data: r } = await supa.from("reservations").select("user_id, car_id, start_date, end_date, credits_used").eq("id", reservation_id).maybeSingle();
    if (!r) return jsonResponse({ error: "not found" }, 404);
    const [{ data: profile }, { data: car }] = await Promise.all([
      supa.from("profiles").select("email, first_name, last_name").eq("id", r.user_id).maybeSingle(),
      supa.from("cars").select("name").eq("id", r.car_id).maybeSingle(),
    ]);
    const fmt = (d: string) => new Date(d).toLocaleDateString("es-ES");
    const userName = `${profile?.first_name || ""} ${profile?.last_name || ""}`.trim() || profile?.email || "—";
    const body = `
      <p style="margin:0 0 16px 0;">Nueva reserva recibida.</p>
      <p style="margin:0 0 8px 0;"><strong>Usuario:</strong> ${userName}</p>
      <p style="margin:0 0 8px 0;"><strong>Email:</strong> ${profile?.email || "—"}</p>
      <p style="margin:0 0 8px 0;"><strong>Vehículo:</strong> ${car?.name || "—"}</p>
      <p style="margin:0 0 8px 0;"><strong>Inicio:</strong> ${fmt(r.start_date)}</p>
      <p style="margin:0 0 8px 0;"><strong>Fin:</strong> ${fmt(r.end_date)}</p>
      <p style="margin:0 0 8px 0;"><strong>Créditos:</strong> ${r.credits_used ?? "—"} días</p>
      ${ctaButton("Ver en el panel", `${SITE_URL}/admin/reservas`)}
    `;
    const html = owneoEmailTemplate("Nueva reserva", `${car?.name || "Vehículo"} — ${userName}`, body);
    const sr = await sendEmail({ to: ADMIN_EMAIL, subject: `Nueva reserva — ${car?.name || ""} — ${userName}`, html });
    return jsonResponse({ ok: sr.ok });
  } catch (e) {
    console.error(e);
    return jsonResponse({ error: String(e) }, 500);
  }
});
