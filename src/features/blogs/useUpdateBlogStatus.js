import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBlogStatus as updateBlogStatusApi } from '../../services/apiBlogs';
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useSupabase } from '../../hooks/useSupabase';

export function useUpdateBlogStatus() {
  const { blogId } = useParams();
  const queryClient = useQueryClient();
  const supabase = useSupabase();

  const { mutate: updateBlogStatus, isLoading: isUpdating } = useMutation({
    mutationFn: ({ status }) => updateBlogStatusApi(supabase, blogId, status),
    onSuccess: (data, variables) => {
      let message;
      switch (variables.status) {
        case 'draft':
          message = `Blog #${blogId} was successfully moved to draft`;
          break;
        case 'published':
          message = `Blog #${blogId} was successfully published`;
          break;
        case 'archived':
          message = `Blog #${blogId} was successfully archived`;
          break;
        default:
          message = `Blog #${blogId} status was successfully updated`;
      }
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ['blog', blogId] });
    },
    onError: () =>
      toast.error('There was an error while updating the blog status'),
  });
  return { updateBlogStatus, isUpdating };
}
