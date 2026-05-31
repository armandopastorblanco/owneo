import { createClient } from 'npm:@supabase/supabase-js@2';
import webpush from 'npm:web-push@3.6.7';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { title, body } = await req.json();

    if (!title || !body) {
      return new Response(
        JSON.stringify({ error: 'title and body are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const vapidPublic = Deno.env.get('VAPID_PUBLIC_KEY');
    const vapidPrivate = Deno.env.get('VAPID_PRIVATE_KEY');
    const contactEmail = Deno.env.get('VAPID_CONTACT_EMAIL') ?? 'mailto:info@owneo.es';

    if (!vapidPublic || !vapidPrivate) {
      return new Response(
        JSON.stringify({ error: 'VAPID keys not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    webpush.setVapidDetails(contactEmail, vapidPublic, vapidPrivate);

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const { data: subs, error } = await supabase
      .from('admin_push_subscriptions')
      .select('id, subscription');

    if (error) throw error;

    const payload = JSON.stringify({ title, body });

    const results = await Promise.allSettled(
      (subs ?? []).map(async (row: any) => {
        try {
          await webpush.sendNotification(row.subscription, payload);
          return { id: row.id, ok: true };
        } catch (err: any) {
          // Remove expired/invalid subscriptions
          if (err?.statusCode === 404 || err?.statusCode === 410) {
            await supabase.from('admin_push_subscriptions').delete().eq('id', row.id);
          }
          return { id: row.id, ok: false, error: err?.message, statusCode: err?.statusCode };
        }
      })
    );

    const sent = results.filter((r) => r.status === 'fulfilled' && (r as any).value.ok).length;
    const failed = results.length - sent;

    return new Response(
      JSON.stringify({ ok: true, total: results.length, sent, failed }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('send-admin-push error', err);
    return new Response(
      JSON.stringify({ error: err?.message ?? 'unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
