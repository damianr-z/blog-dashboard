import styled from 'styled-components';
import Button from './Button';
import Row from './Row';
import { useLogOut } from '../features/authentication/useLogOut';
import SpinnerMini from './SpinnerMini';

const StyledHeader = styled.header`
  background-color: var(--c-black-100);
  padding: 1.2rem 4.8rem;
  grid-column: 1 / -1;
  border-bottom: 1px solid var(--c-grey-500);
`;

const StyledLogo = styled.h1`
  font-size: var(--fs-32);
  font-family: var(--ff-heading);
  font-weight: 600;
  color: var(--c-blue-100);
  line-height: 1.4;
`;

function Header() {
  const { handleLogOut, isLoading } = useLogOut();
  return (
    <StyledHeader>
      {/* <Logo type={'small'} /> */}
      <Row type={'horizontal'}>
        <StyledLogo>Blog Dashboard</StyledLogo>
        {!isLoading ? (
          <Button variation={'secondary'} size={'small'} onClick={handleLogOut}>
            Log Out
          </Button>
        ) : (
          <SpinnerMini />
        )}
      </Row>
    </StyledHeader>
  );
}

export default Header;
