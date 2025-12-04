import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { deleteBlog as deleteBlogApi } from '../../services/apiBlogs';
import { useSupabase } from '../../hooks/useSupabase';

export function useDeleteBlog() {
  const queryClient = useQueryClient();
  const supabase = useSupabase();

  const { isLoading: isDeleting, mutate: deleteBlog } = useMutation({
    mutationFn: (id) => deleteBlogApi(supabase, id),
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
