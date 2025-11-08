import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditBlog } from '../../services/apiBlogs';
import { toast } from 'react-hot-toast';
import supabase from '../../services/supabase';

export function useEditBlog() {
  const queryClient = useQueryClient();

  const { mutate: editBlog, isLoading: isEditing } = useMutation({
    mutationFn: ({ newBlogData, id }) => createEditBlog(supabase,newBlogData, id),
    onSuccess: () => {
      toast.success('blog successfully edited');
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editBlog };
}
