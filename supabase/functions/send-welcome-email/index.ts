import { owneoEmailTemplate, ctaButton, sendEmail, jsonResponse, corsHeaders, SITE_URL } from "../_shared/email-template.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const { email, name } = await req.json();
    if (!email) return jsonResponse({ error: "email required" }, 400);
    const greeting = name ? `Hola ${name},` : "Hola,";
    const body = `
      <p style="margin:0 0 16px 0;">${greeting}</p>
      <p style="margin:0 0 16px 0;">Te damos la bienvenida a <strong style="color:#bda095;">OWNEO</strong> — copropiedad de supercoches.</p>
      <p style="margin:0 0 16px 0;">Así funciona la copropiedad en OWNEO:</p>
      <ul style="margin:0 0 20px 0;padding-left:20px;color:#ffffff;">
        <li style="margin:0 0 8px 0;"><strong style="color:#bda095;">Una participación es el 10% del valor del vehículo</strong> — da cuatro semanas de uso al año.</li>
        <li style="margin:0 0 8px 0;"><strong style="color:#bda095;">Cuota anual fija</strong> — seguro a todo riesgo, mantenimiento, parking, gestión y entrega.</li>
        <li style="margin:0 0 8px 0;"><strong style="color:#bda095;">Vehículos premium</strong> — una selección de supercoches en Madrid, Barcelona, Valencia, Marbella, Ibiza y Alicante.</li>
      </ul>
      <p style="margin:0 0 16px 0;">Síguenos para no perderte las novedades de nuestra flota:</p>
      <p style="margin:0 0 8px 0;">
        <a href="https://www.instagram.com/owneo_supercars" style="color:#bda095;text-decoration:none;">Instagram</a>
      </p>
    `;
    const html = owneoEmailTemplate("Bienvenido a OWNEO", "Copropiedad de supercoches", body);
    const r = await sendEmail({ to: email, subject: "Bienvenido a OWNEO", html });
    return jsonResponse({ ok: r.ok }, r.ok ? 200 : 502);
  } catch (e) {
    console.error(e);
    return jsonResponse({ error: String(e) }, 500);
  }
});
