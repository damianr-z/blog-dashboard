import { useQuery } from '@tanstack/react-query';
import { getBlogsAfterDate } from '../../services/apiBlogs';

export function useRecentBlogs() {
  const { isLoading, data: blogs } = useQuery({
    queryFn: getBlogsAfterDate,
    queryKey: ['recent-activity'],
  });

  return { blogs, isLoading };
}
