import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBlog } from '../../services/apiBlogs';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function usePublish() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: publishBlog, isLoading: isPublishing } = useMutation({
    mutationFn: ({ BlogId }) =>
      updateBlog(BlogId, {
        status: 'published',
      }),

    onSuccess: (data) => {
      toast.success(`Blog #${data.id} successfully published`);
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      navigate('/');
    },

    onError: () => toast.error('There was an error while publishing the blog'),
  });
  return { publishBlog, isPublishing };
}
