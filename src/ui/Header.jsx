import styled from 'styled-components';
// import Logo from './Logo';

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
  return (
    <StyledHeader>
      {/* <Logo type={'small'} /> */}
      <StyledLogo>Blog Dashboard</StyledLogo>
    </StyledHeader>
  );
}

export default Header;
