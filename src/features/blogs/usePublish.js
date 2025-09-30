import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBlogSatus } from '../../services/apiBlogs';
import { toast } from 'react-hot-toast';
import { useBlog } from './useBlog';
import { useParams } from 'react-router-dom';

export function usePublish() {
  const { blogId } = useParams();
  const queryClient = useQueryClient();

  const { mutate: publishBlog, isLoading: isPublishing } = useMutation({
    mutationFn: ({ blogId, status }) => updateBlogSatus(blogId, status),
    onSuccess: () => {
      toast.success(`Blog #${blogId} was successfully published`);
      queryClient.invalidateQueries({ queryKey: ['blog', blogId] });
    },
    onError: () => toast.error('There was an error while publishing the blog'),
  });

  return { publishBlog, isPublishing };
}
