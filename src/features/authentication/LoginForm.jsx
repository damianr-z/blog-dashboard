import { useState } from 'react';
import { useLogin } from './useLogin';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import SpinnerMini from '../../ui/SpinnerMini';

function LoginForm() {
  const { login, isLoading } = useLogin();
  const [email, setEmail] = useState('damian@example.com');
  const [password, setPassword] = useState('anothergreatpass1');

  async function handleSubmit(e) {
    e.preventDefault();
    await login({ email, password });
    setEmail('');
    setPassword('');
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
