import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBlogSatus } from '../../services/apiBlogs';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function usePublish() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: publishBlog, isLoading: isPublishing } = useMutation({
    mutationFn: ({ blogId, status }) => updateBlogSatus(blogId, status),
    onSuccess: (data) => {
      toast.success(`Blog #${data.id} was successfully published`);
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
    onError: () => toast.error("There was an error while publishing the blog"),
  });

  return { publishBlog, isPublishing };
}
