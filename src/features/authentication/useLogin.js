import { useState } from 'react';
import { useSignIn, useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export function useLogin() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const login = async ({ email, password }) => {
    if (!isLoaded || !email || !password) return;

    setIsLoading(true);

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        toast.success('Successfully logged in!');
        navigate('/blogs', { replace: true });
      }
    } catch (err) {
      console.error('❌ Clerk login failed:', err);
      toast.error(
        err.errors?.[0]?.message || 'Provided email and password are incorrect '
      );
    } finally {
      setIsLoading(false);
    }

    if (authLoaded && isSignedIn) {
      navigate('/blogs', { replace: true });
      return null; // Don't render the form
    }
  };

  return { login, isLoading };
}
