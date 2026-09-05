// Sync any lead captured on the site into Brevo (CRM) with the official
// Supabase -> Brevo attribute mapping.
// Called fire-and-forget from every public form.
import { createClient } from "npm:@supabase/supabase-js@2";



const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// Brevo list ids (folder Owneo).
const LIST_LEADS = 6;
const LIST_CANDIDATES = 7;
const LIST_COPROPIETARIOS = 8;
const LIST_DISQUALIFIED = 9;

const CANDIDATE_STATUSES = ["pending", "scoring", "waitlist", "approved"];

/**
 * List assignment rules:
 * - QUALIFICATION_STATUS = rejected                       -> owneo_disqualified
 * - active/signed participation                           -> owneo_copropietarios
 * - optin confirmed + status in candidate statuses        -> owneo_candidates
 * - optin confirmed + status not approved/rejected        -> owneo_leads
 * - optin not confirmed                                   -> no list (contact only)
 */
const resolveListIds = (
  optinStatus: string,
  qualificationStatus: string,
  participationActive: boolean,
): number[] => {
  if (qualificationStatus === "rejected") return [LIST_DISQUALIFIED];
  if (participationActive) return [LIST_COPROPIETARIOS];
  if (optinStatus !== "confirmed") return [];
  if (CANDIDATE_STATUSES.includes(qualificationStatus)) return [LIST_CANDIDATES];
  if (qualificationStatus === "approved") return [LIST_CANDIDATES];
  return [LIST_LEADS];
};


// Source form -> origin table (SOURCE_LIST) + acquisition channel.
const ORIGIN_BY_SOURCE: Record<string, { list: string; channel: string }> = {
  contacto: { list: "contacts", channel: "web_form" },
  beta_gate: { list: "contacts", channel: "web_form" },
  landing: { list: "contacts", channel: "web_form" },
  car_detail: { list: "consultation_requests", channel: "consultation_form" },
  dashboard_concierge: { list: "consultation_requests", channel: "consultation_form" },
  participation: { list: "participation_requests", channel: "participation_form" },
};

const KNOWN_BRANDS = [
  "Ferrari",
  "Porsche",
  "Lamborghini",
  "Aston Martin",
  "McLaren",
  "Mercedes-AMG",
  "Bentley",
  "Rolls-Royce",
];

const brandFromVehicle = (vehicle: string) => {
  const v = vehicle.toLowerCase();
  return KNOWN_BRANDS.find((b) => v.includes(b.toLowerCase())) ?? "";
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
    const language = body.language === "en" ? "en" : "es";
    const origin = ORIGIN_BY_SOURCE[source] ?? { list: "contacts", channel: "web_form" };
    const vehicle = str(body.car_name);
    const acquisitionDate = str(body.created_at) || new Date().toISOString();

    const apiKey = Deno.env.get("BREVO_API_KEY");
    if (!apiKey) {
      console.warn("BREVO_API_KEY not configured");
      return json({ ok: false, reason: "missing_api_key" }, 200);
    }

    // Never resurrect a suppressed address (unsubscribe / bounce / complaint).
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { persistSession: false } },
    );
    const { data: suppressed } = await supabase
      .from("suppressed_emails")
      .select("reason")
      .eq("email", email)
      .maybeSingle();
    if (suppressed) {
      return json({ ok: true, skipped: "suppressed", reason: suppressed.reason });
    }


    const attributes: Record<string, string | number> = {
      SUPABASE_ID: str(body.id),
      FIRSTNAME: str(body.name),
      LASTNAME: str(body.surname),
      PHONE: str(body.phone),
      LANGUAGE: language,
      ACQUISITION_DATE: acquisitionDate.slice(0, 10),
      VEHICLE_OF_INTEREST: vehicle,
      BRAND_OF_INTEREST: brandFromVehicle(vehicle),
      HUB_OF_INTEREST: str(body.city),
      SOURCE_LIST: origin.list,
      ACQUISITION_CHANNEL: origin.channel,
    };

    const qualificationStatus = str(body.status);
    const optinStatus = str(body.welcome_optin_status) || "pending";
    const participationActive =
      body.participation_active === true || qualificationStatus === "active";

    if (typeof body.score === "number") attributes.SCORE_DD = body.score;
    if (qualificationStatus) attributes.QUALIFICATION_STATUS = qualificationStatus;
    attributes.WELCOME_OPTIN_STATUS = optinStatus;
    if (typeof body.num_participations === "number") {
      attributes.PARTICIPATIONS_REQUESTED = body.num_participations;
    }

    for (const k of Object.keys(attributes)) {
      if (attributes[k] === "" || attributes[k] === undefined) delete attributes[k];
    }

    const listIds = resolveListIds(optinStatus, qualificationStatus, participationActive);


    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        attributes,
        ...(listIds.length ? { listIds } : {}),
        updateEnabled: true,
      }),

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
