import { useUser as useClerkUser } from '@clerk/clerk-react';

export function useUser() {
  const { isLoaded, isSignedIn, user } = useClerkUser();

  return {
    isLoading: !isLoaded,
    user: isSignedIn ? user : null,
    isAuthenticated: isSignedIn,
  };
}
