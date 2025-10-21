import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getBlog } from '../../services/apiBlogs';
import { useSupabase } from '../../hooks/useSupabase';

export function useBlog() {
  const { blogId } = useParams();
  const supabase = useSupabase();

  const {
    isLoading,
    data: blog,
    error,
  } = useQuery({
    queryKey: ['blog', blogId],
    queryFn: () => getBlog(supabase, blogId),
    retry: false,
  });
  return { isLoading, error, data: blog };
}
