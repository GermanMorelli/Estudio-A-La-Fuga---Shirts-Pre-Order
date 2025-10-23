// supabaseClient.js
// Client-side Supabase helper — uses PUBLIC env variables.
// IMPORTANT: keep any service-role or admin keys on the server only.
import { createClient } from '@supabase/supabase-js'
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'

if (!PUBLIC_SUPABASE_URL || !PUBLIC_SUPABASE_ANON_KEY) {
	// At runtime this will help debugging if env vars are missing
	console.warn('Missing PUBLIC_SUPABASE_URL or PUBLIC_SUPABASE_ANON_KEY in environment')
}

export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY)
