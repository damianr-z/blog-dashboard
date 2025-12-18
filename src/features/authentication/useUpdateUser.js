import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useUser as useClerkUser } from '@clerk/clerk-react';
import {
  updateCurrentUser,
  updateAuthorInSupabase,
} from '../../services/apiAuth';
import { useSupabase } from '../../hooks/useSupabase';

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { user: clerkUser } = useClerkUser();
  const supabase = useSupabase();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: async ({ firstName, lastName, avatar, password }) => {
      if (password) {
        await clerkUser.updatePassword({ newPassword: password });
        return clerkUser;
      }

      // Update Clerk user first
      const updatedUser = await updateCurrentUser({
        clerkUser,
        firstName,
        lastName,
        avatar,
      });

      // Update Supabase author table
      if (supabase && updatedUser) {
        await updateAuthorInSupabase(supabase, updatedUser);
      }

      return updatedUser;
    },
    onSuccess: (updatedUser) => {
      const newName = `${updatedUser.firstName || ''} ${
        updatedUser.lastName || ''
      }`.trim();

      // Update chached data with new author name
      queryClient.setQueriesData({ queryKey: ['blogs'] }, (old) => {
        if (!old?.data) return old;

        return {
          ...old,
          data: old.data.map((blog) =>
            blog.author?.user_id === clerkUser.id
              ? { ...blog, author: { ...blog.author, name: newName } }
              : blog
          ),
        };
      });

      // Update single blog cache
      queryClient.setQueriesData({ queryKey: ['blog'] }, (old) => {
        if (!old?.author) return old;
        if (old.author.user_id === clerkUser.id) {
          return {
            ...old,
            author: { ...old.author, name: newName },
          };
        }
        return old;
      });

      // Invalidate to esure fresh data on next render
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      queryClient.invalidateQueries({ queryKey: ['blog'] });

      toast.success('Profile updated successfully');
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateUser, isUpdating };
}
