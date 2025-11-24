import { useState } from 'react';
import { useClerk } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export function useLogOut() {
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogOut = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signOut();

      toast.success('Successfully logged out!', { duration: 2000 });

      await new Promise((resolve) => setTimeout(resolve, 1000));

      navigate('/login', { replace: true });
    } catch (error) {
      console.log('Sign out error:', error);
      setIsLoading(false);
    }
  };

  return { handleLogOut, isLoading };
}
