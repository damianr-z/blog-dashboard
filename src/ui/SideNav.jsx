import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import {
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiFolderOpen,
  HiOutlineUsers,
} from 'react-icons/hi2';

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  background-color: var(--c-grey-300);
  border-radius: var(--border-radius-lg);
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 1.2rem;
    margin: 1rem;
    gap: 1rem;
    color: var(--c-white-200);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1rem 1rem;
    transition: all 0.3s;
  }

  &:not(:first-child) {
    margin-top: 1rem;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--c-blue-50);
    background-color: var(--c-blue-600);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--c-white-200);
    transition: all 0.2s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--c-blue-50);
  }
`;

function SideNav() {
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to="/" end>
            <HiOutlineHome />
            <span>Home</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/blogs">
            <HiFolderOpen />
            <span>Blogs</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/users">
            <HiOutlineUsers />
            <span>Users</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/settings">
            <HiOutlineCog6Tooth />
            <span>Settings</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}

export default SideNav;
