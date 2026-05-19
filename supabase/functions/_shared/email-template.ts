// Shared OWNEO email template + Resend sender
// Used by all transactional edge functions

export function owneoEmailTemplate(title: string, preheader: string, bodyHtml: string): string {
  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:'Encode Sans Expanded', Arial, sans-serif;color:#ffffff;">
<div style="display:none;font-size:1px;color:#0a0a0a;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${escapeHtml(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0a0a0a;">
  <tr><td align="center" style="padding:32px 16px;">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background-color:#111111;border:1px solid #bda095;border-radius:6px;overflow:hidden;">
      <tr><td align="center" style="padding:14px 24px 10px 24px;border-bottom:1px solid rgba(201,168,76,0.3);background-color:#0a0a0a;">
        <img src="https://deafxtmgcqovwqlvktte.supabase.co/storage/v1/object/public/email-assets/owneo-logo.png" alt="OWNEO" height="112" style="display:block;height:112px;width:auto;border:0;outline:none;text-decoration:none;">
      </td></tr>
      <tr><td style="padding:32px 32px 24px 32px;color:#ffffff;font-family:'Encode Sans Expanded', Arial, sans-serif;font-weight:300;font-size:15px;line-height:1.6;">
        ${bodyHtml}
      </td></tr>
      <tr><td style="padding:16px 32px 8px 32px;">
        <hr style="border:none;border-top:1px solid #bda095;margin:0;">
      </td></tr>
      <tr><td align="center" style="padding:16px 32px 24px 32px;color:#888888;font-size:13px;font-family:'Encode Sans Expanded', Arial, sans-serif;">
        <p style="margin:0 0 12px 0;color:#ffffff;">El equipo OWNEO</p>
        <p style="margin:0 0 16px 0;">
          <a href="#" style="color:#bda095;text-decoration:none;margin:0 8px;font-size:18px;">Ig</a>
          <a href="#" style="color:#bda095;text-decoration:none;margin:0 8px;font-size:18px;">In</a>
          <a href="#" style="color:#bda095;text-decoration:none;margin:0 8px;font-size:18px;">Fb</a>
        </p>
        <p style="margin:0;font-size:11px;color:#666666;">© 2025 OWNEO. Todos los derechos reservados.</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;
}

export function ctaButton(label: string, href: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:24px 0;"><tr><td style="background:#bda095;border-radius:4px;"><a href="${href}" style="display:inline-block;background:#bda095;color:#0a0a0a;font-weight:700;padding:14px 32px;border-radius:4px;text-decoration:none;font-family:'Encode Sans Expanded', Arial, sans-serif;font-size:14px;letter-spacing:1px;">${escapeHtml(label)}</a></td></tr></table>`;
}

function escapeHtml(s: string): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

export const SITE_URL = "https://owneo.es";
export const SENDER = "OWNEO <noreply@owneo.es>";
export const REPLY_TO = "contacto@owneo.es";
export const ADMIN_EMAIL = "armando.pastorblanco@gmail.com";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

export async function sendEmail(opts: {
  to: string | string[];
  subject: string;
  html: string;
}): Promise<{ ok: boolean; status: number; body: string }> {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) {
    console.error("RESEND_API_KEY not configured");
    return { ok: false, status: 500, body: "RESEND_API_KEY not configured" };
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: SENDER,
      to: Array.isArray(opts.to) ? opts.to : [opts.to],
      subject: opts.subject,
      html: opts.html,
      reply_to: REPLY_TO,
    }),
  });
  const text = await res.text();
  if (!res.ok) console.error("Resend error", res.status, text);
  return { ok: res.ok, status: res.status, body: text };
}

export function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
