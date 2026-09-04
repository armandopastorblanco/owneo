import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";
import { owneoEmailTemplate, sendEmail, jsonResponse, corsHeaders, REPLY_TO } from "../_shared/email-template.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const { request_id } = await req.json();
    if (!request_id) return jsonResponse({ error: "request_id required" }, 400);
    const supa = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const { data: pr } = await supa.from("participation_requests").select("user_id, rejection_reason").eq("id", request_id).maybeSingle();
    if (!pr) return jsonResponse({ error: "request not found" }, 404);
    const { data: profile } = await supa.from("profiles").select("email, first_name").eq("id", pr.user_id).maybeSingle();
    if (!profile?.email) return jsonResponse({ ok: true });
    const reason = pr.rejection_reason || "Tras un análisis detallado, no podemos aceptar tu solicitud en este momento.";
    const body = `
      <p style="margin:0 0 16px 0;">Hola${profile.first_name ? ` ${profile.first_name}` : ""},</p>
      <p style="margin:0 0 16px 0;">Hemos revisado tu solicitud de participación con detenimiento.</p>
      <p style="margin:0 0 16px 0;">Lamentamos comunicarte que en esta ocasión no hemos podido aprobarla.</p>
      <div style="border-left:2px solid #bda095;padding:12px 16px;margin:16px 0;background:rgba(189,160,149,0.05);">
        <p style="margin:0;color:#cccccc;font-style:italic;white-space:pre-wrap;">${reason.replace(/</g, "&lt;")}</p>
      </div>
      <p style="margin:16px 0;">Si tienes cualquier duda, escríbenos a <a href="mailto:${REPLY_TO}" style="color:#bda095;text-decoration:none;">${REPLY_TO}</a> y estaremos encantados de atenderte.</p>
    `;
    const html = owneoEmailTemplate("Actualización sobre tu solicitud", "Información sobre tu solicitud OWNEO", body);
    const r = await sendEmail({ to: profile.email, subject: "Actualización sobre tu solicitud — OWNEO", html });
    return jsonResponse({ ok: r.ok });
  } catch (e) {
    console.error(e);
    return jsonResponse({ error: String(e) }, 500);
  }
});
