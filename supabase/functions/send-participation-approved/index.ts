import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";
import { owneoEmailTemplate, sendEmail, jsonResponse, corsHeaders } from "../_shared/email-template.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const { request_id } = await req.json();
    if (!request_id) return jsonResponse({ error: "request_id required" }, 400);
    const supa = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const { data: pr } = await supa.from("participation_requests").select("user_id, car_id").eq("id", request_id).maybeSingle();
    if (!pr) return jsonResponse({ error: "request not found" }, 404);
    const [{ data: profile }, { data: car }] = await Promise.all([
      supa.from("profiles").select("email, name").eq("id", pr.user_id).maybeSingle(),
      supa.from("cars").select("name").eq("id", pr.car_id).maybeSingle(),
    ]);
    if (!profile?.email) return jsonResponse({ error: "no email" }, 200);
    const body = `
      <p style="margin:0 0 16px 0;">Hola${profile.name ? ` ${profile.name}` : ""},</p>
      <p style="margin:0 0 16px 0;">Tu solicitud de participación en el ${car?.name || "vehículo"} ha superado nuestro proceso de evaluación.</p>
      <p style="margin:0 0 16px 0;">El siguiente paso lo damos nosotros: una persona del equipo de OWNEO se pondrá en contacto contigo para acompañarte en los trámites administrativos y financieros que formalizan tu participación.</p>
      <p style="margin:0 0 16px 0;">No necesitas hacer nada por ahora. Te escribimos en breve.</p>
      <p style="margin:0;">Si tienes alguna pregunta mientras tanto, puedes responder a este correo.</p>
    `;
    const html = owneoEmailTemplate("Tu solicitud ha superado la evaluación", "El siguiente paso lo damos nosotros.", body);
    const r = await sendEmail({ to: profile.email, subject: "Tu solicitud ha superado la evaluación — OWNEO", html });
    return jsonResponse({ ok: r.ok });
  } catch (e) {
    console.error(e);
    return jsonResponse({ error: String(e) }, 500);
  }
});
