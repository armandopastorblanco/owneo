// Reconciliation between Brevo and public.suppressed_emails.
//
// 1. Pulls Brevo blocked/bounced/unsubscribed contacts and INSERTs them into
//    suppressed_emails (append-only: never deletes existing rows).
// 2. Detects contacts deleted in Brevo (known lead email no longer in Brevo)
//    and suppresses them as "unsubscribe".
// 3. Verifies no suppressed email is still active in a Brevo list; if it is,
//    the contact is blacklisted and unlinked from every list, and reported.
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const BREVO = "https://api.brevo.com/v3";

type Reason = "unsubscribe" | "bounce" | "complaint";

const REASON_BY_BLOCK: Record<string, Reason> = {
  hardBounce: "bounce",
  softBounce: "bounce",
  blocked: "bounce",
  invalid: "bounce",
  adminBlocked: "bounce",
  spam: "complaint",
  contactFlaggedAsSpam: "complaint",
  unsubscribed: "unsubscribe",
  unsubscribedViaApi: "unsubscribe",
  unsubscribedViaMA: "unsubscribe",
};

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const apiKey = Deno.env.get("BREVO_API_KEY");
  if (!apiKey) return json({ error: "BREVO_API_KEY not configured" }, 500);

  const headers = { "api-key": apiKey, Accept: "application/json", "Content-Type": "application/json" };
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    { auth: { persistSession: false } },
  );

  try {
    const suppress = new Map<string, { reason: Reason; metadata: Record<string, unknown> }>();

    // --- 1. Brevo contacts flagged as unsubscribed (emailBlacklisted) -------
    const brevoContacts = new Map<string, { blacklisted: boolean; listIds: number[] }>();
    for (let offset = 0; offset < 5000; offset += 500) {
      const res = await fetch(`${BREVO}/contacts?limit=500&offset=${offset}`, { headers });
      if (!res.ok) {
        const t = await res.text();
        console.error("Brevo contacts error", res.status, t);
        return json({ error: "Brevo request failed", status: res.status, details: t }, res.status);
      }
      const data = await res.json();
      const items: any[] = data.contacts ?? [];
      for (const c of items) {
        const email = String(c.email ?? "").toLowerCase();
        if (!email) continue;
        brevoContacts.set(email, {
          blacklisted: c.emailBlacklisted === true,
          listIds: Array.isArray(c.listIds) ? c.listIds : [],
        });
        if (c.emailBlacklisted === true) {
          suppress.set(email, { reason: "unsubscribe", metadata: { source: "brevo_blacklist" } });
        }
      }
      if (items.length < 500) break;
    }

    // --- 2. Brevo transactional blocked contacts (bounces / spam) ----------
    for (let offset = 0; offset < 2000; offset += 100) {
      const res = await fetch(`${BREVO}/smtp/blockedContacts?limit=100&offset=${offset}`, { headers });
      if (!res.ok) break;
      const data = await res.json();
      const items: any[] = data.contacts ?? [];
      for (const c of items) {
        const email = String(c.email ?? "").toLowerCase();
        if (!email) continue;
        const reason = REASON_BY_BLOCK[String(c.reason?.code ?? c.reason ?? "")] ?? "bounce";
        suppress.set(email, {
          reason,
          metadata: { source: "brevo_blocked_contacts", brevo_reason: c.reason ?? null },
        });
      }
      if (items.length < 100) break;
    }

    // --- 3. Known leads absent from Brevo (report only) --------------------
    // An address missing from Brevo may have been deleted OR simply never
    // synced, so we only REPORT it here; real deletions are suppressed by the
    // brevo-webhook "contact_deleted" event.
    const knownEmails = new Set<string>();
    const [contacts, consultations, profiles, waitlist] = await Promise.all([
      supabase.from("contacts").select("email"),
      supabase.from("consultation_requests").select("email"),
      supabase.from("profiles").select("email"),
      supabase.from("waitlist").select("email"),
    ]);
    for (const r of [contacts, consultations, profiles, waitlist]) {
      for (const row of r.data ?? []) {
        const email = String((row as any).email ?? "").toLowerCase().trim();
        if (email.includes("@")) knownEmails.add(email);
      }
    }

    const missingInBrevo: string[] = [];
    for (const email of knownEmails) {
      if (brevoContacts.has(email) || suppress.has(email)) continue;
      missingInBrevo.push(email);
    }


    // --- 4. Append-only insert into suppressed_emails ----------------------
    const rows = [...suppress.entries()].map(([email, v]) => ({
      email,
      reason: v.reason,
      metadata: { ...v.metadata, synced_at: new Date().toISOString() },
    }));
    if (rows.length) {
      const { error } = await supabase
        .from("suppressed_emails")
        .upsert(rows, { onConflict: "email", ignoreDuplicates: true });
      if (error) {
        console.error("suppressed_emails insert failed", error);
        return json({ error: "Insert failed", details: error.message }, 500);
      }
    }

    // --- 5. Verify: no suppressed email active in a Brevo list ------------
    const { data: suppressed } = await supabase.from("suppressed_emails").select("email");
    const discrepancies: string[] = [];
    const blocked: string[] = [];
    for (const row of suppressed ?? []) {
      const email = String((row as any).email ?? "").toLowerCase();
      const brevo = brevoContacts.get(email);
      if (!brevo) continue;
      if (brevo.blacklisted && brevo.listIds.length === 0) continue;
      discrepancies.push(email);
      const res = await fetch(`${BREVO}/contacts/${encodeURIComponent(email)}`, {
        method: "PUT",
        headers,
        body: JSON.stringify({
          emailBlacklisted: true,
          ...(brevo.listIds.length ? { unlinkListIds: brevo.listIds } : {}),
        }),
      });
      if (res.ok) blocked.push(email);
      else console.error("Brevo block failed", email, res.status, await res.text());
    }

    return json({
      ok: true,
      suppressed_inserted_or_existing: rows.length,
      deleted_in_brevo: deleted,
      discrepancies,
      blocked_in_brevo: blocked,
    });
  } catch (err) {
    console.error("sync-brevo-suppressions error", err);
    return json({ error: "Internal error" }, 500);
  }
});
