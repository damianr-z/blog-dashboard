import { useQuery } from '@tanstack/react-query';
import { getBlog } from '../../services/apiBlogs';
import { useParams } from 'react-router-dom';
import supabase from '../../services/supabase';

export function useBlog() {
  const { blogId } = useParams();
  const {
    isLoading,
    data: blog,
    error,
  } = useQuery({
    queryKey: ['blog', blogId],
    queryFn: () => getBlog(supabase, blogId),
    retry: false,
  });

  return { isLoading, error, blog };
}
