import { createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiEllipsisVertical } from 'react-icons/hi2';
import styled from 'styled-components';
import { useOutsideClick } from '../hooks/useOutsideClick';

const Menu = styled.div`
  display: flex;
  flex-direction: center;
  justify-content: center;
  position: relative;
  anchor-name: --profile-button;
`;

const StyledToggle = styled.button`
    background: none;
    border: none;
    padding: 0.4rem;
    border-radius: var(--border-radius-sm);
    transform; translateX(0-.8rem);
    transition: all 0.2s;
    cursor: pointer;
    
    &:hover {
      background-color: var(--c-blue-600);
    }
    & svg {
      width: 2.4rem;
      height: 2.4rem;
      color: var(--c-blue-50);
    }
    
    `;

const StyledList = styled.ul`
  position: fixed;
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-sm);
  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
  transition: opacity 0.2s;
  opacity: 1;
`;

const StyledListItem = styled.li`
  background-color: var(--c-grey-100);
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  font-size: 12px;
  padding: 0.6rem 1.2rem;
  transition: all 0.2s allow-discrete;
  color: var(--c-white-400);
  display: flex;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;

  &:hover {
    background-color: var(--c-blue-600);
    color: var(--c-blue-50);
  }

  & svg {
    width: 1.2rem;
    height: 1.2rem;
    transition: all 0.3;
  }
`;

const MenusContext = createContext();

function Menus({ children }) {
  const [OpenId, setOpenId] = useState('');
  const [position, setPosition] = useState(null);

  const close = () => setOpenId('');
  const openMenu = setOpenId;

  return (
    <MenusContext.Provider
      value={{ OpenId, openMenu, close, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id, xPos, yPos }) {
  const { OpenId, close, setPosition, openMenu } = useContext(MenusContext);
  function handleClick(e) {
    e.stopPropagation(); // to avoid closing the menu instantly
    const rect = e.target.closest('button').getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - (rect.x + xPos || 0),
      y: rect.y + rect.height + yPos || 0,
    });

    OpenId === '' || OpenId !== id ? openMenu(id) : close();
  }

  return (
    <StyledToggle popover id="modal-menu" onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({ id, children }) {
  const { OpenId, close, position } = useContext(MenusContext);

  const ref = useOutsideClick(() => {
    close();
  }, false);

  if (OpenId !== id) return null;

  return createPortal(
    <StyledList popovertarget="modal-menu" position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body,
  );
}

function ListItem({ children, icon, onClick }) {
  const { close } = useContext(MenusContext);
  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <StyledListItem>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </StyledListItem>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.ListItem = ListItem;

export default Menus;
