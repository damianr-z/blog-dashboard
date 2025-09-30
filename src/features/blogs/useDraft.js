import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBlogSatus } from '../../services/apiBlogs';
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';

export function useDraft() {
  const { blogId } = useParams();
  const queryClient = useQueryClient();

  const { mutate: draftBlog, isLoading: isDrafting } = useMutation({
    mutationFn: ({ blogId, status }) => updateBlogSatus(blogId, status),
    onSuccess: () => {
      toast.success(`Blog #${blogId} was successfully drafted`);
      queryClient.invalidateQueries({ queryKey: ['blog', blogId] });
    },
    onError: () =>
      toast.error('There was an error while setting the blog as draft'),
  });

  return { draftBlog, isDrafting };
}
