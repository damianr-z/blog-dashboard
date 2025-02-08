import styled from 'styled-components';
import SideNav from './SideNav';

const StyledSidebar = styled.aside`
  background-color: var(--c-white-600);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--c-grey-500);
  grid-column: 2 / -1;
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
