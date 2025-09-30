import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBlogSatus } from '../../services/apiBlogs';
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';

export function useArchive() {
  const { blogId } = useParams();
  const queryClient = useQueryClient();

  const { mutate: archiveBlog, isLoading: isArchiving } = useMutation({
    mutationFn: ({ blogId, status }) => updateBlogSatus(blogId, status),
    onSuccess: () => {
      toast.success(`Blog #${blogId} was successfully archived`);
      queryClient.invalidateQueries({ queryKey: ['blog', blogId] });
    },
    onError: () => toast.error('There was an error while archiving the blog'),
  });

  return { archiveBlog, isArchiving };
}
