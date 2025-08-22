import { useQuery } from '@tanstack/react-query';
import {useParams} from 'react-router-dom';
import { getBlogs } from '../../services/apiBlogs';

export function useBlogs() {
  const {blogId} = useParams();
  const {
    isLoading,
    data: {data: blogs, count} = {},
    error,
  } = useQuery({
    queryKey: ['blogs'],
    queryFn: () => getBlogs(blogId),
    retry: false,
  });

  return { isLoading, error, blogs, count };
}
