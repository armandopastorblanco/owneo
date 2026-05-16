import { owneoEmailTemplate, ctaButton, sendEmail, jsonResponse, corsHeaders, ADMIN_EMAIL, SITE_URL } from "../_shared/email-template.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const { name, email, phone, car_name, message, source } = await req.json();
    if (!email) return jsonResponse({ error: "email required" }, 400);
    const carLine = car_name ? `<p style="margin:0 0 16px 0;">Vehículo de interés: <strong style="color:#c9a84c;">${car_name}</strong></p>` : "";
    const bodyUser = `
      <p style="margin:0 0 16px 0;">Hola${name ? ` ${name}` : ""},</p>
      <p style="margin:0 0 16px 0;">Hemos recibido tu consulta y la estamos revisando.</p>
      ${carLine}
      <p style="margin:0 0 16px 0;">Nuestro equipo te responderá lo antes posible.</p>
    `;
    const htmlUser = owneoEmailTemplate("Hemos recibido tu consulta", "Te contactaremos lo antes posible", bodyUser);
    await sendEmail({ to: email, subject: "Hemos recibido tu consulta — OWNEO", html: htmlUser });

    const bodyAdmin = `
      <p style="margin:0 0 16px 0;">Nueva consulta recibida desde <strong style="color:#c9a84c;">${source || "—"}</strong>.</p>
      <p style="margin:0 0 8px 0;"><strong>Nombre:</strong> ${name || "—"}</p>
      <p style="margin:0 0 8px 0;"><strong>Email:</strong> ${email}</p>
      <p style="margin:0 0 8px 0;"><strong>Teléfono:</strong> ${phone || "—"}</p>
      <p style="margin:0 0 8px 0;"><strong>Vehículo:</strong> ${car_name || "—"}</p>
      <p style="margin:0 0 8px 0;"><strong>Origen:</strong> ${source || "—"}</p>
      <p style="margin:16px 0 8px 0;"><strong>Mensaje:</strong></p>
      <p style="margin:0 0 16px 0;color:#888888;white-space:pre-wrap;">${(message || "").replace(/</g, "&lt;")}</p>
      ${ctaButton("Ver en el panel", `${SITE_URL}/admin/consultas`)}
    `;
    const htmlAdmin = owneoEmailTemplate("Nueva consulta recibida", `${car_name || "Consulta"} — ${source || ""}`, bodyAdmin);
    const r = await sendEmail({
      to: ADMIN_EMAIL,
      subject: `Nueva consulta recibida — ${car_name || "Consulta"} — ${source || ""}`,
      html: htmlAdmin,
    });
    return jsonResponse({ ok: r.ok });
  } catch (e) {
    console.error(e);
    return jsonResponse({ error: String(e) }, 500);
  }
});
