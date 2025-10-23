import { json } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/private';

export async function POST({ request }) {
  try {
    // Read env vars at request time, with fallback to process.env for dev
    const SUPABASE_URL = env?.SUPABASE_URL ?? process.env.SUPABASE_URL;
    const SUPABASE_SERVICE_ROLE_KEY = env?.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      console.error('[api/preorder] Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
      return json({ error: 'Server not configured (missing Supabase env vars)' }, { status: 500 });
    }

    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false }
    });

    const body = await request.json();
    console.log('[api/preorder] received body:', body);
    const { nombre, telefono, talla } = body || {};

    if (!nombre || !telefono || !talla) {
      return json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('preorders')
      .insert([{ nombre, telefono, talla }])
      .select();

    console.log('[api/preorder] supabase response:', { data, error });

    if (error) {
      return json({ error: error.message, details: error }, { status: 500 });
    }

    return json({ ok: true, inserted: data }, { status: 201 });
  } catch (err) {
    console.error('[api/preorder] handler error:', err);
    return json({ error: 'Server error', message: String(err) }, { status: 500 });
  }
}
