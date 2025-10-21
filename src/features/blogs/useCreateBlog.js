import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { createEditBlog } from '../../services/apiBlogs';
import { useSupabase } from '../../hooks/useSupabase';
/// to call all blogs

// create blog
export function useCreateBlog() {
  const queryClient = useQueryClient();
  const supabase = useSupabase();

  const { mutate: createBlog, isLoading: isCreating } = useMutation({
    mutationFn: (newBlog) => createEditBlog(supabase, newBlog),
    onSuccess: () => {
      toast.success('New blog successfully created');
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createBlog };
}
