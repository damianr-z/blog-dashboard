import styled from 'styled-components';
import Logo from './Logo';

const StyledHeader = styled.header`
  background-color: var(--c-black-100);
  padding: 1.2rem 4.8rem;
  grid-column: 1 / -1;
  border-bottom: 1px solid var(--c-grey-500);
`;

function Header() {
  return (
    <StyledHeader>
      <Logo type={'small'} />
    </StyledHeader>
  );
}

export default Header;
