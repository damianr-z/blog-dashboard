import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getBlogs } from '../../services/apiBlogs';
import supabase from '../../services/supabase';
import { PAGE_SIZE } from '../../utils/constants';

export function useBlogs() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // ✅ Extract parameters exactly as your components set them
  const filterValue = searchParams.get('status') || 'all';
  const sortBy = searchParams.get('sortBy') || 'created_at-newest';
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  const {
    isLoading,
    data: { data: blogs, count } = {},
    error,
  } = useQuery({
    queryKey: ['blogs', filterValue, sortBy, page], // ✅ This should trigger refetch on filter/sort change
    queryFn: () => {
      return getBlogs(supabase, {
        filter: filterValue,
        sortBy,
        page,
      });
    },
    retry: false,
  });

  const pageCount = Math.ceil((count || 0) / PAGE_SIZE);

  // Prefetching logic...
  if (!isLoading && count > 0) {
    if (page < pageCount) {
      queryClient.prefetchQuery({
        queryKey: ['blogs', filterValue, sortBy, page + 1],
        queryFn: () =>
          getBlogs(supabase, {
            filter: filterValue,
            sortBy,
            page: page + 1,
          }),
      });
    }

    if (page > 1) {
      queryClient.prefetchQuery({
        queryKey: ['blogs', filterValue, sortBy, page - 1],
        queryFn: () =>
          getBlogs(supabase, {
            filter: filterValue,
            sortBy,
            page: page - 1,
          }),
      });
    }
  }

  return {
    isLoading,
    error,
    blogs: blogs || [],
    count: count || 0,
  };
}
