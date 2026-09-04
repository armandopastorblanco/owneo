import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";
import { owneoEmailTemplate, ctaButton, sendEmail, jsonResponse, corsHeaders, SITE_URL } from "../_shared/email-template.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const { reservation_id } = await req.json();
    if (!reservation_id) return jsonResponse({ error: "reservation_id required" }, 400);
    const supa = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const { data: r } = await supa.from("reservations").select("user_id, car_id, start_date, end_date, credits_used").eq("id", reservation_id).maybeSingle();
    if (!r) return jsonResponse({ error: "reservation not found" }, 404);
    const [{ data: profile }, { data: car }] = await Promise.all([
      supa.from("profiles").select("email, first_name").eq("id", r.user_id).maybeSingle(),
      supa.from("cars").select("name, manager_name, manager_email, manager_phone").eq("id", r.car_id).maybeSingle(),
    ]);
    if (!profile?.email) return jsonResponse({ ok: true });
    const fmt = (d: string) => new Date(d).toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" });
    const managerBlock = (car?.manager_name || car?.manager_email || car?.manager_phone) ? `
      <div style="border-top:1px solid rgba(189,160,149,0.3);padding-top:16px;margin-top:24px;">
        <p style="margin:0 0 8px 0;color:#bda095;font-weight:600;">Tu gestor del vehículo</p>
        ${car?.manager_name ? `<p style="margin:0 0 4px 0;">${car.manager_name}</p>` : ""}
        ${car?.manager_phone ? `<p style="margin:0 0 4px 0;">${car.manager_phone}</p>` : ""}
        ${car?.manager_email ? `<p style="margin:0 0 4px 0;"><a href="mailto:${car.manager_email}" style="color:#bda095;text-decoration:none;">${car.manager_email}</a></p>` : ""}
      </div>` : "";
    const body = `
      <p style="margin:0 0 16px 0;">Hola${profile.first_name ? ` ${profile.first_name}` : ""},</p>
      <p style="margin:0 0 16px 0;"><strong style="color:#bda095;">Tu reserva está confirmada.</strong></p>
      <p style="margin:0 0 8px 0;"><strong>Vehículo:</strong> ${car?.name || "—"}</p>
      <p style="margin:0 0 8px 0;"><strong>Inicio:</strong> ${fmt(r.start_date)}</p>
      <p style="margin:0 0 8px 0;"><strong>Fin:</strong> ${fmt(r.end_date)}</p>
      <p style="margin:0 0 8px 0;"><strong>Créditos utilizados:</strong> ${r.credits_used ?? "—"} días</p>
      ${managerBlock}
      ${ctaButton("Ver mi reserva", `${SITE_URL}/dashboard`)}
    `;
    const html = owneoEmailTemplate("Tu reserva está confirmada", "Disfruta de tu experiencia OWNEO", body);
    const sr = await sendEmail({ to: profile.email, subject: "Tu reserva está confirmada — OWNEO", html });
    return jsonResponse({ ok: sr.ok });
  } catch (e) {
    console.error(e);
    return jsonResponse({ error: String(e) }, 500);
  }
});
