// Sync any lead captured on the site into Brevo (CRM) with full attributes.
// Called fire-and-forget from every public form.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// Brevo list ids per lead origin. 5 = lista de espera / general.
const LIST_BY_SOURCE: Record<string, number[]> = {
  beta_gate: [5],
  landing: [5],
  contacto: [5],
  car_detail: [5],
  dashboard_concierge: [5],
  participation: [5],
};

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") return json({ error: "Invalid JSON body" }, 400);

    const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
    const email = str(body.email).toLowerCase();
    if (!email.includes("@")) return json({ error: "Invalid email" }, 400);

    const source = str(body.source) || "web";
    const language = body.language === "en" ? "EN" : "ES";

    const apiKey = Deno.env.get("BREVO_API_KEY");
    if (!apiKey) {
      console.warn("BREVO_API_KEY not configured");
      return json({ ok: false, reason: "missing_api_key" }, 200);
    }

    const attributes: Record<string, string> = {
      NOMBRE: str(body.name),
      APELLIDOS: str(body.surname),
      SMS: str(body.phone),
      TELEFONO: str(body.phone),
      CIUDAD: str(body.city),
      IDIOMA: language,
      ORIGEN: source,
      VEHICULO: str(body.car_name),
      ASUNTO: str(body.subject),
      MENSAJE: str(body.message).slice(0, 500),
      ULTIMO_CONTACTO: new Date().toISOString().slice(0, 10),
    };
    for (const k of Object.keys(attributes)) {
      if (!attributes[k]) delete attributes[k];
    }

    const listIds = LIST_BY_SOURCE[source] ?? [5];

    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, attributes, listIds, updateEnabled: true }),
    });

    const text = await res.text();
    if (!res.ok) {
      console.error("Brevo error", res.status, text);
      return json({ ok: false, status: res.status, body: text }, 200);
    }
    return json({ ok: true });
  } catch (err) {
    console.error("sync-brevo-contact error", err);
    return json({ error: "Internal error" }, 500);
  }
});
