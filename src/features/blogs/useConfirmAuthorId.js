import { useUser } from '../authentication/useUser';
import { useEffect, useState } from 'react';
import { useSupabase } from '../../hooks/useSupabase';
import { toast } from 'react-hot-toast';

export function useConfirmAuthorId({ author }) {
  const { user } = useUser();
  const supabase = useSupabase();
  const [currentUserAuthorId, setCurrentUserAuthorId] = useState(null);

  useEffect(() => {
    async function fetchUserAuthorId() {
      if (!user) return;

      const { data } = await supabase
        .from('author')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (data) setCurrentUserAuthorId(data.id);
    }
    fetchUserAuthorId();
  }, [user, supabase]);

  const isOwner =
    author?.id && currentUserAuthorId && currentUserAuthorId === author.id;

  function handleDelete() {
    toast.error('You can only delete your own blogs');
  }

  return { isOwner, handleDelete };
}
