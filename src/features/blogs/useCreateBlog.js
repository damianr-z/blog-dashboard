import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { getBlogs, deleteBlog as deleteBlogApi } from '../../services/apiBlogs';
import { createEditBlog } from "../../services/apiBlogs";

/// to call all blogs


// create blog
export function useCreateBlog() {
  const queryClient = useQueryClient();

  const { mutate: createBlog, isLoading: isCreating } = useMutation({
    mutationFn: createEditBlog,
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createBlog };
}
