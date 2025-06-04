import { createContext, useContext } from 'react';
import styled from 'styled-components';

const StyledTable = styled.div`
  background-color: var(--c-grey-400);
  color: var(--c-white-100);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  shadow: var(--shadow-lg);
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
  color: var(--c-white-400);
  &:not(:last-child) {
    border-bottom: 1px solid var(--c-grey-200);
  }
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;
  background-color: var(--c-grey-400);
  border-bottom: 1px solid var(--c-grey-200);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font: var(--fs-24) var(--ff-subheading);
`;

const StyledRow = styled(CommonRow)`
  padding: 1.8rem 2.4rem;
  font: var(--fs-20) var(--ff-text);
  &:not(:last-child) {
    border-bottom: 1px solid var(--c-grey-100);
  }
`;

const StyledBody = styled.section`

`;

const Empty = styled.p`
  font-size: 1.6rem;
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

export default Table;
