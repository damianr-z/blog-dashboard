import styled from 'styled-components';
import SignUpForm from '../features/authentication/SignUpForm';
import Heading from '../ui/Heading';

const Layout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: start;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--c-grey-100);
`;

export default function Register() {
  return (
    <Layout>
      <Heading as="h3">Register a new account</Heading>
      <SignUpForm />
    </Layout>
  );
}
