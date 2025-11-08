import { createClient } from '@supabase/supabase-js';

// Default Supabase client for public/unauthenticated requests
export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
export const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

// Helper function to create authenticated Supabase client with Clerk JWT
export function createClerkSupabaseClient(getToken) {
  const client = createClient(supabaseUrl, supabaseKey, {
    global: {
      fetch: async (url, options = {}) => {
        const clerkToken = await getToken({ template: 'supabase' });

        const headers = new Headers(options?.headers);
        if (clerkToken) {
          headers.set('Authorization', `Bearer ${clerkToken}`);
        }

        return fetch(url, {
          ...options,
          headers,
        });
      },
    },
  });

  return client;
}

export default supabase;
