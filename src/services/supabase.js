import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY;

// Single global instance
let supabaseClient = null;

export function createClerkSupabaseClient(getToken) {
  // Create only once
  if (!supabaseClient) {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: async () => {
          const token = await getToken({ template: 'supabase' });
          return token ? { Authorization: `Bearer ${token}` } : {};
        },
      },
    });
  }

  return supabaseClient;
}

// For backward compatibility
const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;
