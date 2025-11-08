import { useState, useEffect } from 'react';
import { useSignIn, useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import SpinnerMini from '../../ui/SpinnerMini';
// import { useLogin } from './useLogin';

function LoginForm() {
  // const { login, isLoading } = useLogin();
  const { signIn, setActive, isLoaded: signInLoaded } = useSignIn();
  const { isSignedIn, isLoaded: authLoaded } = useAuth();
  const [email, setEmail] = useState('damian@example.com');
  const [password, setPassword] = useState('anothergreatpass1');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (authLoaded && isSignedIn) {
  //     navigate('/blogs', { replace: true });
  //   }
  // }, [authLoaded, isSignedIn, navigate]);

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   signIn(
  //     { email, password },
  //     {
  //       onSettled: () => {
  //         setEmail('');
  //         setPassword('');
  //       },
  //     }
  //   );
  //   login({ email, password });
  // }

  if (authLoaded && isSignedIn) {
    navigate('/blogs', { replace: true });
    return null; // Don't render the form
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!signInLoaded || !email || !password) return;

    setIsLoading(true);

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });
      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        console.log('✅ Clerk login successful:', result);
        toast.success('Successfully logged in!');
        navigate('/blogs', { replace: true });
      } else {
        // to handle other statuses if needed
      }
    } catch (err) {
      console.error('❌ Clerk login failed:', err);

      // // ✅ Handle session exists error
      // if (err.errors?.[0]?.code === 'session_exists') {
      //   toast.success('You are already signed in! Redirecting...');
      //   navigate('/blogs', { replace: true });
      //   return;
      // }

      toast.error(
        err.errors?.[0]?.message || 'Provided email and password are incorrect '
      );
    } finally {
      setIsLoading(false);
      setEmail('');
      setPassword('');
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow visibility="visible" label="Email address">
        <Input
          type="email"
          id="email"
          placeholder="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow label="Password" visibility="visible">
        <Input
          type="password"
          id="password"
          placeholder="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRow>
      <FormRow>
        <Button size="large" disabled={isLoading}>
          {!isLoading ? 'Log in' : <SpinnerMini />}
        </Button>
      </FormRow>
    </Form>
  );
}

export default LoginForm;
