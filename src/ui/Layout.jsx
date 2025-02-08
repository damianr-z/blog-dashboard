import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';
import Header from './Header';
import styled from 'styled-components';

const StyledLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 26rem;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--c-white-600);
  padding: 4rem 4.8rem 6.4rem;
  grid-row: 2 / -1;
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
