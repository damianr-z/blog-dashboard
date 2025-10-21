import { useQuery } from '@tanstack/react-query';
// import { useParams } from 'react-router-dom';
import { getBlogs } from '../../services/apiBlogs';
import { useSupabase } from '../../hooks/useSupabase';

export function useBlogs() {
  // const { blogId } = useParams();
  const supabase = useSupabase();

  const { isLoading, data, error } = useQuery({
    queryKey: ['blogs'],
    queryFn: () => getBlogs(supabase),
    retry: false,
  });

  const blogs = data?.data || [];
  const count = data?.count || 0;

  return { isLoading, error, blogs, count };
}
