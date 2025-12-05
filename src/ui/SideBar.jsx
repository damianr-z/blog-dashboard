import styled from 'styled-components';
import SideNav from './SideNav';

const StyledSidebar = styled.aside`
  background-color: var(--c-black-200);
  padding: 3.2rem 2.4rem;
  grid-column: 1 / 2;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function SideBar() {
  return (
    <StyledSidebar>
      <SideNav />
    </StyledSidebar>
  );
}

export default SideBar;
