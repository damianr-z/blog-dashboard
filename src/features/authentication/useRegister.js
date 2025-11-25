import { useState } from 'react';
import { useSignUp } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export function useRegister() {
  const { signUp, setActive, isLoaded } = useSignUp();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const register = async ({ name, email, password }) => {
    if (!name || !isLoaded || !email || !password) return;

    setIsLoading(true);

    try {
      console.log('🔐 Creating account for:', email);
      const nameParts = name.trim().split(' ');
      const firstName = nameParts[0] || name;
      const lastName = nameParts.slice(1).join(' ') || '';

      const result = await signUp.create({
        emailAddress: email,
        password,
        firstName,
        lastName,
      });

      console.log('✅ Sign-up result', result);

      if (result.status === 'missing_requirements') {
        await signUp.prepareEmailAddressVerification({
          strategy: 'email_code',
        });

        toast.success('Verification email sent! Please check your inbox.');
        return;
      }

      if (result.status === 'complete') {
        // ✅ Activate the session
        await setActive({ session: result.createdSessionId });

        console.log('✅ Session activated');
        console.log('✅ __client_uat:', localStorage.getItem('__client_uat'));

        toast.success(`Welcome, ${firstName}!`);
        navigate('/blogs', { replace: true });
      }
    } catch (err) {
      console.error('❌ Sign-Up error:', err);
      if (err.errors?.[0]?.code === 'form_identifier_exists') {
        toast.error('This email is already registered');
      } else {
        toast.error(err.errors?.[0]?.message || 'Failed to create account');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading };
}
