import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";
import { owneoEmailTemplate, ctaButton, sendEmail, jsonResponse, corsHeaders, ADMIN_EMAIL, SITE_URL } from "../_shared/email-template.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const { request_id } = await req.json();
    if (!request_id) return jsonResponse({ error: "request_id required" }, 400);
    const supa = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const { data: pr } = await supa.from("participation_requests").select("user_id, car_id, created_at").eq("id", request_id).maybeSingle();
    if (!pr) return jsonResponse({ error: "not found" }, 404);
    const [{ data: profile }, { data: car }] = await Promise.all([
      supa.from("profiles").select("email, first_name, last_name").eq("id", pr.user_id).maybeSingle(),
      supa.from("cars").select("name").eq("id", pr.car_id).maybeSingle(),
    ]);
    const userName = `${profile?.first_name || ""} ${profile?.last_name || ""}`.trim() || profile?.email || "—";
    const dateStr = new Date(pr.created_at).toLocaleString("es-ES");
    const body = `
      <p style="margin:0 0 16px 0;">Nueva solicitud de participación recibida.</p>
      <p style="margin:0 0 8px 0;"><strong>Usuario:</strong> ${userName}</p>
      <p style="margin:0 0 8px 0;"><strong>Email:</strong> ${profile?.email || "—"}</p>
      <p style="margin:0 0 8px 0;"><strong>Vehículo:</strong> ${car?.name || "—"}</p>
      <p style="margin:0 0 8px 0;"><strong>Fecha:</strong> ${dateStr}</p>
      ${ctaButton("Ver solicitud", `${SITE_URL}/admin/solicitudes`)}
    `;
    const html = owneoEmailTemplate("Nueva solicitud de participación", `${car?.name || "Vehículo"}`, body);
    const sr = await sendEmail({ to: ADMIN_EMAIL, subject: `Nueva solicitud de participación — ${car?.name || ""}`, html });
    return jsonResponse({ ok: sr.ok });
  } catch (e) {
    console.error(e);
    return jsonResponse({ error: String(e) }, 500);
  }
});
