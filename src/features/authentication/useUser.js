import { useUser as useClerkUser } from '@clerk/clerk-react';

export function useUser() {
  const { isLoaded, isSignedIn, user } = useClerkUser();

  return {
    isLoaded: !isLoaded,
    user: isSignedIn ? user : null,
    isAuthenticated: isSignedIn,
  };
}
