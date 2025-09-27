import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBlogSatus } from '../../services/apiBlogs';
import { toast } from 'react-hot-toast';

export function useArchive() {
  const queryClient = useQueryClient();

  const { mutate: archiveBlog, isLoading: isArchiving } = useMutation({
    mutationFn: ({ blogId, status }) => updateBlogSatus(blogId, status),
    onSuccess: (data) => {
      toast.success(`Blog #${data.id} was successfully archived`);
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
    onError: () => toast.error('There was an error while archiving the blog'),
  });

  return { archiveBlog, isArchiving };
}
