import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBlogSatus } from '../../services/apiBlogs';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useDraft() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: draftBlog, isLoading: isDrafting } = useMutation({
    mutationFn: ({ blogId, status }) => updateBlogSatus(blogId, status),
    onSuccess: (data) => {
      toast.success(`Blog #${data.id} was successfully drafted`);
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
    onError: () =>
      toast.error('There was an error while setting the blog as draft'),
  });

  return { draftBlog, isDrafting };
}
