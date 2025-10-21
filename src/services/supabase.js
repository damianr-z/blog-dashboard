import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// Default Supabase client for public/unauthenticated requests
const supabase = createClient(supabaseUrl, supabaseKey);

// Helper function to create authenticated Supabase client with Clerk JWT
export function createClerkSupabaseClient(getToken) {
  return createClient(supabaseUrl, supabaseKey, {
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

  console.log('createClerkSupabaseClient - returning:', client);
  console.log('createClerkSupabaseClient - has .from?', typeof client.from);

  return client;
}

export default supabase;
