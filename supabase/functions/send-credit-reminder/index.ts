import { owneoEmailTemplate, ctaButton, sendEmail, jsonResponse, corsHeaders, SITE_URL } from "../_shared/email-template.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const { user_email, vehicle_name, credits_remaining, credits_reset_date } = await req.json();
    if (!user_email) return jsonResponse({ error: "user_email required" }, 400);
    const fmt = credits_reset_date ? new Date(credits_reset_date).toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" }) : "—";
    const body = `
      <p style="margin:0 0 16px 0;">Hola,</p>
      <p style="margin:0 0 16px 0;">Te quedan <strong style="color:#c9a84c;">${credits_remaining} días</strong> de créditos disponibles para tu participación en <strong>${vehicle_name || "tu vehículo"}</strong>.</p>
      <p style="margin:0 0 16px 0;">Estos créditos caducarán el <strong style="color:#c9a84c;">${fmt}</strong>. Aprovéchalos antes de que se reinicien.</p>
      ${ctaButton("Reservar ahora", `${SITE_URL}/dashboard`)}
    `;
    const html = owneoEmailTemplate("Tus créditos OWNEO caducan pronto", `Quedan ${credits_remaining} días disponibles`, body);
    const sr = await sendEmail({ to: user_email, subject: "Tus créditos OWNEO caducan pronto", html });
    return jsonResponse({ ok: sr.ok });
  } catch (e) {
    console.error(e);
    return jsonResponse({ error: String(e) }, 500);
  }
});
