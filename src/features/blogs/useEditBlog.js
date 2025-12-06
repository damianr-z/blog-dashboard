import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditBlog } from '../../services/apiBlogs';
import { toast } from 'react-hot-toast';
import { useSupabase } from '../../hooks/useSupabase';
import { useUser } from '../authentication/useUser';

export function useEditBlog() {
  const queryClient = useQueryClient();
  const supabase = useSupabase();
  const { user } = useUser();

  const { mutate: editBlog, isLoading: isEditing } = useMutation({
    mutationFn: ({ newBlogData, id }) =>
      createEditBlog(supabase, newBlogData, id, user),
    onSuccess: () => {
      toast.success('blog successfully edited');
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editBlog };
}
