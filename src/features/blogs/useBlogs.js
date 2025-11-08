// import { useQuery } from '@tanstack/react-query';
// // import { useParams } from 'react-router-dom';
// import { getBlogs } from '../../services/apiBlogs';
// import { useSupabase } from '../../hooks/useSupabase';

// export function useBlogs() {
//   // const { blogId } = useParams();
//   const supabase = useSupabase();

//   console.log('useBlogs - supabase client:', supabase);
//   console.log('useBlogs - has .from?', typeof supabase?.from);

//   const { isLoading, data, error } = useQuery({
//     queryKey: ['blogs'],
//     queryFn: () => getBlogs(supabase),
//     retry: false,
//   });

//   const blogs = data?.data || [];
//   const count = data?.count || 0;

//   return { isLoading, error, blogs, count };
// }

// test version

import { useQuery } from '@tanstack/react-query';
import { getBlogs } from '../../services/apiBlogs';
import supabase from '../../services/supabase';

export function useBlogs() {
  const {
    isLoading,
    data: { data: blogs, count } = {},
    error,
  } = useQuery({
    queryKey: ['blogs'],
    queryFn: () => getBlogs(supabase),
  });

  return { isLoading, error, blogs, count };
}
