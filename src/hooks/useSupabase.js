import { useAuth } from '@clerk/clerk-react';
import { useMemo } from 'react';
import { createClerkSupabaseClient } from '../services/supabase';

export function useSupabase() {
  const { getToken } = useAuth();

  // Recreate only when getToken changes (usually stable from Clerk)
  const client = useMemo(() => {
    return createClerkSupabaseClient(getToken);
  }, [getToken]);

  return client;
}
