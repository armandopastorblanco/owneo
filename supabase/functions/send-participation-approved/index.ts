import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";
import { owneoEmailTemplate, ctaButton, sendEmail, jsonResponse, corsHeaders, SITE_URL } from "../_shared/email-template.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const { request_id } = await req.json();
    if (!request_id) return jsonResponse({ error: "request_id required" }, 400);
    const supa = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const { data: pr } = await supa.from("participation_requests").select("user_id, car_id").eq("id", request_id).maybeSingle();
    if (!pr) return jsonResponse({ error: "request not found" }, 404);
    const [{ data: profile }, { data: car }, { data: vp }] = await Promise.all([
      supa.from("profiles").select("email, first_name").eq("id", pr.user_id).maybeSingle(),
      supa.from("cars").select("name").eq("id", pr.car_id).maybeSingle(),
      supa.from("validated_participations").select("participation_number, credits_per_year").eq("request_id", request_id).maybeSingle(),
    ]);
    if (!profile?.email) return jsonResponse({ error: "no email" }, 200);
    const body = `
      <p style="margin:0 0 16px 0;">Hola${profile.first_name ? ` ${profile.first_name}` : ""},</p>
      <p style="margin:0 0 16px 0;"><strong style="color:#c9a84c;">¡Enhorabuena!</strong> Tu solicitud de participación ha sido aprobada.</p>
      <p style="margin:0 0 8px 0;"><strong>Vehículo:</strong> ${car?.name || "—"}</p>
      ${vp?.participation_number ? `<p style="margin:0 0 8px 0;"><strong>Número de participación:</strong> #${vp.participation_number}</p>` : ""}
      ${vp?.credits_per_year ? `<p style="margin:0 0 8px 0;"><strong>Créditos anuales:</strong> ${vp.credits_per_year} días</p>` : ""}
      <p style="margin:16px 0;">Ya puedes empezar a planificar tus reservas desde tu espacio personal.</p>
      ${ctaButton("Acceder a mi panel", `${SITE_URL}/dashboard`)}
    `;
    const html = owneoEmailTemplate("Tu participación ha sido aprobada", "Bienvenido a la familia OWNEO", body);
    const r = await sendEmail({ to: profile.email, subject: "Tu participación ha sido aprobada — OWNEO", html });
    return jsonResponse({ ok: r.ok });
  } catch (e) {
    console.error(e);
    return jsonResponse({ error: String(e) }, 500);
  }
});
