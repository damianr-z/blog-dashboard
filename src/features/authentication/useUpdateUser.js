import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useUser as useClerkUser } from '@clerk/clerk-react';
import { updateCurrentUser } from '../../services/apiAuth';

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { user: clerkUser } = useClerkUser();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: async ({ firstName, lastName, avatar, fullName }) => {
      // Update Clerk user
      const updatedUser = await updateCurrentUser({
        clerkUser,
        firstName: firstName || fullName?.split(' ')[0],
        lastName: lastName || fullName?.split(' ').slice(1).join(' '),
        avatar,
      });

      return updatedUser;
    },
    onSuccess: (user) => {
      toast.success('User account successfully updated');
      // Invalidate and refetch user data
      queryClient.invalidateQueries(['user']);
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateUser, isUpdating };
}
