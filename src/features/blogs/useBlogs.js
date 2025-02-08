import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { getBlogs, deleteBlog as deleteBlogApi } from '../../services/apiBlogs';
import { createEditBlog } from "../../services/apiBlogs";

/// to call all blogs
export function useBlogs() {
  const {
    isLoading,
    data: blogs,
    error,
  } = useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs,
  });

  return { isLoading, error, blogs };
}

// create blog
export function useCreateBlog() {
  const queryClient = useQueryClient();

  const { mutate: createBlog, isLoading: isCreating } = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createBlog };
}

// delete blog
export function useDeleteBlog() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteBlog } = useMutation({
    mutationFn: deleteBlogApi,
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
