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
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const nombre = typeof body.nombre === 'string' ? body.nombre.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const ciudad = typeof body.ciudad === 'string' ? body.ciudad.trim() : '';
    const language = body.language === 'en' ? 'en' : 'es';

    if (!email.includes('@')) {
      return new Response(JSON.stringify({ error: 'Invalid email' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const { error: dbError } = await supabase
      .from('waitlist')
      .upsert({ nombre, email, ciudad, language }, { onConflict: 'email' });

    if (dbError) {
      console.error('Waitlist upsert error', dbError);
      return new Response(JSON.stringify({ error: 'Database error' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Mirror into consultation_requests so it surfaces in admin/consultas "Landing"
    // and triggers the notify_admin_new_consulta push notification.
    try {
      const { error: consultErr } = await supabase.from('consultation_requests').insert({
        name: nombre || email,
        email,
        message: `Solicitud desde lista de espera${ciudad ? ` — Ciudad de interés: ${ciudad}` : ''}`,
        source: 'beta_gate',
        status: 'pending',
        language,
        city: ciudad || null,
      });
      if (consultErr) console.error('consultation_requests insert error', consultErr);
    } catch (err) {
      console.error('consultation_requests insert failed', err);
    }

    // Best-effort Brevo sync — never block the user
    const brevoKey = Deno.env.get('BREVO_API_KEY');
    let brevoOk = false;
    if (brevoKey) {
      try {
        const brevoRes = await fetch('https://api.brevo.com/v3/contacts', {
          method: 'POST',
          headers: {
            'api-key': brevoKey,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            email,
            attributes: {
              NOMBRE: nombre,
              CIUDAD: ciudad,
              IDIOMA: language === 'en' ? 'EN' : 'ES',
              ORIGEN: 'landing',
              ULTIMO_CONTACTO: new Date().toISOString().slice(0, 10),
            },
            listIds: [5],
            updateEnabled: true,
          }),
        });
        brevoOk = brevoRes.ok;
        if (!brevoRes.ok) {
          const txt = await brevoRes.text();
          console.error('Brevo error', brevoRes.status, txt);
        }
      } catch (err) {
        console.error('Brevo fetch failed', err);
      }
    } else {
      console.warn('BREVO_API_KEY not configured');
    }

    return new Response(JSON.stringify({ success: true, brevo: brevoOk }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('join-waitlist error', err);
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
