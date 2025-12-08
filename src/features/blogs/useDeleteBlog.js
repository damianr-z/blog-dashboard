import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { deleteBlog as deleteBlogApi } from '../../services/apiBlogs';
import { useSupabase } from '../../hooks/useSupabase';
import { useUser } from '../authentication/useUser';

export function useDeleteBlog() {
  const queryClient = useQueryClient();
  const supabase = useSupabase();
  const { user } = useUser();

  const { isLoading: isDeleting, mutate: deleteBlog } = useMutation({
    mutationFn: (id) => deleteBlogApi(supabase, id, user),
    onSuccess: () => {
      toast.success('Blog successfully deleted');
      queryClient.invalidateQueries({
        queryKey: ['blogs'],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteBlog };
}
