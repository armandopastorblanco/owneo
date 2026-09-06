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
      <tr><td align="center" style="padding:14px 24px 10px 24px;border-bottom:1px solid rgba(189,160,149,0.3);background-color:#0a0a0a;">
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
          <a href="https://www.instagram.com/owneo_supercars" style="color:#bda095;text-decoration:none;margin:0 8px;font-size:18px;">Instagram</a>
        </p>
        <p style="margin:0;font-size:11px;color:#666666;">© 2026 OWNEO. Todos los derechos reservados.</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;
}

export function owneoLightEmailTemplate(title: string, preheader: string, bodyHtml: string, lang: "es" | "en" = "es"): string {
  const privacyUrl = `${SITE_URL}${lang === "en" ? "/en/privacy-policy" : "/politica-privacidad"}`;
  const legalUrl = `${SITE_URL}${lang === "en" ? "/en/legal-notice" : "/aviso-legal"}`;
  const motto = lang === "en"
    ? "Owneo — Shared luxury, individual enjoyment."
    : "Owneo — Lujo compartido, disfrute individual.";
  const legalLine = lang === "en"
    ? "OWNEO SL · Avenida Aguilera 23, 03007 Alicante, Spain · contacto@owneo.es"
    : "OWNEO SL · Avenida Aguilera 23, 03007 Alicante, España · contacto@owneo.es";
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background-color:#ffffff;font-family:'Encode Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;color:#000000;letter-spacing:0.05em;">
<div style="display:none;font-size:1px;color:#ffffff;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${escapeHtml(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff;">
  <tr><td align="center" style="padding:40px 16px;">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background-color:#ffffff;border:1px solid #e3e3e3;border-radius:6px;overflow:hidden;">
      <tr><td align="center" style="padding:40px 40px 0 40px;">
        <img src="${LOGO_LIGHT_URL}" alt="OWNEO" style="display:block;max-width:220px;width:100%;height:auto;border:0;outline:none;text-decoration:none;">
      </td></tr>
      <tr><td style="padding:30px 40px 0 40px;">
        <hr style="border:none;border-top:1px solid #bda095;margin:0;">
      </td></tr>
      <tr><td style="padding:40px 40px 32px 40px;color:#000000;font-family:'Encode Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;font-weight:400;font-size:15px;line-height:1.7;letter-spacing:0.05em;">
        ${bodyHtml}
      </td></tr>
      <tr><td style="padding:0 40px 30px 40px;">
        <hr style="border:none;border-top:1px solid #e3e3e3;margin:0;">
      </td></tr>
      <tr><td align="center" style="padding:0 40px 40px 40px;color:#888888;font-size:13px;font-family:'Encode Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;letter-spacing:0.05em;">
        <p style="margin:0 0 16px 0;color:#bda095;font-style:italic;">${motto}</p>
        <p style="margin:0 0 12px 0;">
          <a href="${SITE_URL}" style="color:#000000;text-decoration:none;margin:0 8px;">owneo.es</a> ·
          <a href="${privacyUrl}" style="color:#000000;text-decoration:none;margin:0 8px;">${lang === "en" ? "Privacy policy" : "Política de privacidad"}</a> ·
          <a href="${legalUrl}" style="color:#000000;text-decoration:none;margin:0 8px;">${lang === "en" ? "Legal notice" : "Aviso legal"}</a>
        </p>
        <p style="margin:0;font-size:11px;color:#888888;">${legalLine}</p>
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
export const LOGO_DARK_URL = "https://deafxtmgcqovwqlvktte.supabase.co/storage/v1/object/public/email-assets/owneo-logo.png";
export const LOGO_LIGHT_URL = "https://deafxtmgcqovwqlvktte.supabase.co/storage/v1/object/public/email-assets/owneo-logo-positivo.jpg";

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
