import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';
import Header from './Header';
import styled from 'styled-components';

const StyledLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--c-black-200);
  padding: 3.4rem 3rem 6.4rem 2rem;
  grid-row: 2 / -1;
  grid-column: 2 / -1;
`;

function Layout() {
  return (
    <StyledLayout>
      <Header />
      <SideBar />
      <Main>
        <Outlet />
      </Main>
    </StyledLayout>
  );
}

export default Layout;
