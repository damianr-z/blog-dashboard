import { useQuery } from '@tanstack/react-query';
import { getBlogs } from '../../services/apiBlogs';

export function useBlogs() {
  const {
    isLoading,
    data: {data: blogs, count} = {data: [], count: 0 },
    error,
  } = useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs,
  });

  return { isLoading, error, blogs, count };
}
