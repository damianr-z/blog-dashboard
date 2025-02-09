import { useQuery } from '@tanstack/react-query';
import { getBlogs } from '../../services/apiBlogs';

export function useBlogs() {
  const {
    isLoading,
    data: blogs,
    error,
  } = useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs,
  });

  return { isLoading, error, blogs };
}
