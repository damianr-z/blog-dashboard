import { useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
import { getBlogsAfterDate } from '../../services/apiBlogs';
import { getToday } from '../../utils/helpers';
import supabaseClient from '../../services/supabase';

function useRecentBlogs() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get('last')
    ? 7
    : Number(searchParams.get('last'));
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: blogs } = useQuery({
    queryFn: () => getBlogsAfterDate(supabaseClient, queryDate),
    queryKey: ['blogs', `last-${numDays}`],
  });

  // Logic to build charts based on blog status
  //   const confirmedBlogs = blogs?.filter(
  //     (blog) => blog.status === 'draft' || blog.status === 'archive',
  //   );
  return { isLoading, blogs, numDays };
}

export default useRecentBlogs;
