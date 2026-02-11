import { createContext, useContext } from 'react';
import styled from 'styled-components';

const StyledTable = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'columns',
})`
  background-color: var(--c-grey-400);
  color: var(--c-white-100);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
`;

const CommonRow = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'columns',
})`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
  color: var(--c-white-400);
  padding: 1.8rem 2.4rem;
  &:not(:last-child) {
    border-bottom: 1px solid var(--c-grey-200);
  }
`;

const StyledHeader = styled(CommonRow)`
  background-color: var(--c-grey-400);
  border-bottom: 1px solid var(--c-grey-200);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font: var(--fs-24) var(--ff-subheading);
  `;

const StyledRow = styled(CommonRow)`
  background-color: var(--c-grey-300);
  border-bottom: 1px solid var(--c-grey-200);
  > img {
    display: block;
    width: 6.4rem;
    margin-left: 0.8rem;
    aspect-ratio: 3 / 2;
    object-fit: cover;
    object-position: center;
    transform: scale(1.5);
  }
  > p {
    font: var(--fs-18) var(--ff-text);
  }
`;

const StyledBody = styled.section`
  margin: 0;
`;

const Footer = styled.footer`
  background-color: var(--c-grey-400);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

const TableContext = createContext();

function Table({ columns, children }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledHeader role="row" columns={columns} as="header">
      {children}
    </StyledHeader>
  );
}
function Row({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledRow role="row" columns={columns}>
      {children}
    </StyledRow>
  );
}

function Body({ data, render }) {
  if (!data.length) return <Empty>No data to show at the moment</Empty>;

  return <StyledBody>{data.map(render)}</StyledBody>;
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table;
