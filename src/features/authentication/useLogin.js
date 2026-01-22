import { useState } from 'react';
import { useSignIn, useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export function useLogin() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const login = async ({ email, password }) => {
    console.log('🔐 Login attempt started', {
      email,
      isLoaded,
      hasSignIn: !!signIn,
    });

    if (!isLoaded) {
      console.log('⚠️ Clerk not loaded yet');
      return;
    }
    if (!email || !password) {
      console.log('⚠️ Missing email or password', {
        email: !!email,
        password: !!password,
      });
      return;
    }

    setIsLoading(true);

    try {
      console.log('📤 Calling signIn.create...');
      const result = await signIn.create({
        identifier: email,
        password,
      });
      console.log('📥 signIn.create result:', result);

      if (result.status === 'complete') {
        console.log('✅ Login complete, setting active session...');
        await setActive({ session: result.createdSessionId });
        toast.success('Successfully logged in!');
        navigate('/blogs', { replace: true });
      } else if (result.status === 'needs_second_factor') {
        console.log('🔒 Second factor required:', {
          status: result.status,
          supportedSecondFactors: result.supportedSecondFactors,
          firstFactorVerification: result.firstFactorVerification,
          secondFactorVerification: result.secondFactorVerification,
        });
        toast.error(
          'Additional verification required. Check Clerk dashboard settings.',
        );
      } else if (result.status === 'needs_first_factor') {
        console.log('🔑 First factor required:', {
          status: result.status,
          supportedFirstFactors: result.supportedFirstFactors,
        });
      } else {
        console.log('⚠️ Login not complete, status:', result.status, result);
      }
    } catch (err) {
      console.error('❌ Clerk login failed:', err);
      console.error('Error details:', {
        message: err.message,
        errors: err.errors,
        status: err.status,
        clerkError: err.clerkError,
        fullError: JSON.stringify(err, null, 2),
      });

      const errorMessage =
        err.errors?.[0]?.longMessage ||
        err.errors?.[0]?.message ||
        err.message ||
        'Provided email and password are incorrect';

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading };
}
