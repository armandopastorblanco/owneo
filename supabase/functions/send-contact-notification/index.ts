import { owneoEmailTemplate, sendEmail, jsonResponse, corsHeaders } from "../_shared/email-template.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const { name, email, phone, subject, message, car_name } = await req.json();
    if (!name || !email || !subject || !message) {
      return jsonResponse({ error: "name, email, subject and message are required" }, 400);
    }

    const esc = (s: string) =>
      String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const row = (label: string, value: string | null | undefined) => {
      if (!value) return "";
      return `<tr>
        <td style="padding:8px 12px;border-bottom:1px solid rgba(201,168,76,0.2);color:#c9a84c;font-weight:600;white-space:nowrap;vertical-align:top;">${label}</td>
        <td style="padding:8px 12px;border-bottom:1px solid rgba(201,168,76,0.2);color:#ffffff;">${esc(value).replace(/\n/g, "<br>")}</td>
      </tr>`;
    };

    const body = `
      <p style="margin:0 0 16px 0;">Has recibido una nueva consulta desde el formulario de contacto:</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:16px 0;background-color:#0a0a0a;border:1px solid rgba(201,168,76,0.3);border-radius:4px;">
        ${row("Nombre", name)}
        ${row("Email", email)}
        ${row("Teléfono", phone)}
        ${row("Asunto", subject)}
        ${row("Vehículo de interés", car_name)}
        ${row("Mensaje", message)}
      </table>
    `;
    const html = owneoEmailTemplate(
      `Nueva consulta de contacto — ${subject}`,
      `Nueva consulta de ${name}`,
      body,
    );
    const sr = await sendEmail({
      to: "info@owneo.es",
      subject: `Nueva consulta de contacto — ${subject}`,
      html,
    });
    return jsonResponse({ ok: sr.ok });
  } catch (e) {
    console.error(e);
    return jsonResponse({ error: String(e) }, 500);
  }
});
