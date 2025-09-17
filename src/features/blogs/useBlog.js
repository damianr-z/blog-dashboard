import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getBlog } from '../../services/apiBlogs';

export function useBlog() {
  const { blogId } = useParams();
  return useQuery(['blog', blogId], () => getBlog(blogId), {
    retry: false,
  });
}
