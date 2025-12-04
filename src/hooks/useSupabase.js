import { useAuth } from '@clerk/clerk-react';
import { useMemo } from 'react';
import { createClerkSupabaseClient } from '../services/supabase';

export function useSupabase() {
  const { getToken } = useAuth();

  const client = useMemo(() => {
    return createClerkSupabaseClient(getToken);
  }, [getToken]);

  return client;
}
