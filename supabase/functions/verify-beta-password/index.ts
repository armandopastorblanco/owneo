import { createClient } from 'npm:@supabase/supabase-js@2';

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
    const { password } = await req.json();
    if (typeof password !== 'string' || password.length === 0 || password.length > 200) {
      return new Response(JSON.stringify({ ok: false }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data, error } = await supabase
      .from('app_settings')
      .select('value')
      .eq('key', 'beta_gate_password')
      .maybeSingle();

    if (error) {
      return new Response(JSON.stringify({ ok: false }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const expected = (data?.value ?? '').toString().toUpperCase();
    const provided = password.trim().toUpperCase();

    // Constant-time-ish comparison
    let mismatch = expected.length === 0 || expected.length !== provided.length ? 1 : 0;
    const len = Math.max(expected.length, provided.length);
    for (let i = 0; i < len; i++) {
      const a = expected.charCodeAt(i) || 0;
      const b = provided.charCodeAt(i) || 0;
      mismatch |= a ^ b;
    }
    const ok = mismatch === 0;

    return new Response(JSON.stringify({ ok }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (_err) {
    return new Response(JSON.stringify({ ok: false }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
