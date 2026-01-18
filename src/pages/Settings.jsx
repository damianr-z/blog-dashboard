import UpdatePasswordForm from '../features/authentication/UpdatePasswordForm';
import UpdateUserDataForm from '../features/authentication/UpdateUserDataForm';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
import styled from 'styled-components';

const CenteredContainter = styled.div`
  max-width: 30rem;
  margin: 0 auto;
`;

function Settings() {
  return (
    <CenteredContainter>
      <Heading as="h1">Settings</Heading>

      <Row type="vertical">
        <Heading as="h3">Update user data</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row type="vertical">
        <Heading as="h3">Update password</Heading>
        <UpdatePasswordForm />
      </Row>
    </CenteredContainter>
  );
}

export default Settings;
