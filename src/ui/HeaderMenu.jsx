import styled from 'styled-components';
import { useLogOut } from '../features/authentication/useLogOut';
import { HiOutlineUser } from 'react-icons/hi2';
import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import SpinnerMini from './SpinnerMini';
import Button from './Button';
import Row from './Row';
import UserAvatar from '../features/authentication/UserAvatar';

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

const ButtonIcon = styled.button`
  background: none;
  border: none;
  padding: 0.6rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-brand-600);
  }
`;

function HeaderMenu() {
  const { handleLogOut, isLoading } = useLogOut();
  const navigate = useNavigate();

  return (
    <StyledHeaderMenu>
      <li>
        <Row type={'horizontal'}>
          <UserAvatar />
        </Row>
      </li>
      {/* <li>
        <DarkModeToggle />
      </li> */}
      <li>
        {!isLoading ? (
          <Button variation={'naked'} size={'large'} onClick={handleLogOut}>
            <HiArrowRightOnRectangle />
          </Button>
        ) : (
          <SpinnerMini />
        )}
      </li>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
