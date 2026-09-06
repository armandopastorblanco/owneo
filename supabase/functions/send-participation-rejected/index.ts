import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";
import { owneoLightEmailTemplate, sendEmail, jsonResponse, corsHeaders, REPLY_TO, SITE_URL } from "../_shared/email-template.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const { request_id } = await req.json();
    if (!request_id) return jsonResponse({ error: "request_id required" }, 400);

    const supa = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const { data: pr } = await supa
      .from("participation_requests")
      .select("user_id, rejection_reason, language")
      .eq("id", request_id)
      .maybeSingle();
    if (!pr) return jsonResponse({ error: "request not found" }, 404);

    const { data: profile } = await supa
      .from("profiles")
      .select("email, name, preferred_language")
      .eq("id", pr.user_id)
      .maybeSingle();
    if (!profile?.email) return jsonResponse({ ok: true });

    const rawLang = pr.language || profile.preferred_language || "es";
    const lang = rawLang.toLowerCase().startsWith("en") ? "en" : "es";

    const reason = pr.rejection_reason || (
      lang === "en"
        ? "After a detailed analysis, we are unable to accept your application at this time."
        : "Tras un análisis detallado, no podemos aceptar tu solicitud en este momento."
    );

    const greeting = lang === "en" ? "Hello" : "Hola";
    const subject = lang === "en"
      ? "Update on your participation application"
      : "Actualización sobre tu solicitud de participación";
    const preheader = lang === "en"
      ? "Information regarding your admission process."
      : "Información sobre tu proceso de admisión.";
    const intro = lang === "en"
      ? "We sincerely thank you for your time and interest in applying to Owneo."
      : "Te agradecemos sinceramente el tiempo y el interés dedicado a tu solicitud en Owneo.";
    const rejection = lang === "en"
      ? "Following the evaluation of our admission requirements, we regret to inform you that we are unable to approve your application at this time."
      : "Tras la evaluación de los requisitos de admisión, lamentamos informarte de que no es posible aprobar tu solicitud en esta ocasión.";
    const reasonLabel = lang === "en" ? "Reason for the decision:" : "Motivo de la resolución:";
    const closing = lang === "en"
      ? `If you have any questions or wish to request clarification regarding this decision, you can write to us directly by replying to this email or at <a href="mailto:${REPLY_TO}" style="color:#bda095;text-decoration:none;">${REPLY_TO}</a>.`
      : `Si tienes alguna duda o deseas solicitar aclaraciones sobre esta decisión, puedes escribirnos directamente respondiendo a este correo o escribiendo a <a href="mailto:${REPLY_TO}" style="color:#bda095;text-decoration:none;">${REPLY_TO}</a>.`;

    const body = `
      <p style="margin:0 0 16px 0;">${greeting}${profile.name ? ` ${profile.name}` : ""},</p>
      <p style="margin:0 0 16px 0;">${intro}</p>
      <p style="margin:0 0 16px 0;">${rejection}</p>
      <div style="background-color:#f9f9f9;border-left:2px solid #bda095;padding:16px 20px;margin:20px 0;">
        <p style="margin:0 0 8px 0;font-weight:500;">${reasonLabel}</p>
        <p style="margin:0;color:#333333;font-style:italic;white-space:pre-wrap;">${reason.replace(/</g, "&lt;")}</p>
      </div>
      <p style="margin:16px 0 0 0;">${closing}</p>
    `;

    const html = owneoLightEmailTemplate(subject, preheader, body, lang);
    const r = await sendEmail({ to: profile.email, subject: `${subject} — OWNEO`, html });
    return jsonResponse({ ok: r.ok });
  } catch (e) {
    console.error(e);
    return jsonResponse({ error: String(e) }, 500);
  }
});
