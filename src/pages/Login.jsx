import styled from 'styled-components';
import LoginForm from '../features/authentication/LoginForm';
// import Logo from '../ui/Logo';
import Heading from '../ui/Heading';

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: start;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--c-grey-100);
`;

function Login() {
  return (
    <LoginLayout>
      <Heading as="h3">Log in to your account</Heading>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
