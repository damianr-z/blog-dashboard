import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY;

// Store getToket function reference
let currentGetToken = null;

// Single global instance
let supabaseClient = null;

export function createClerkSupabaseClient(getToken) {
  currentGetToken = getToken;

  // Create only once
  if (!supabaseClient) {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: async () => {
          const token = currentGetToken
            ? await currentGetToken({ template: 'supabase' })
            : null;
          console.log(
            '🔍 Token being sent:',
            token ? 'Token exists' : 'No token'
          );
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
