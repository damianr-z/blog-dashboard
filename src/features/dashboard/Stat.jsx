import styled from 'styled-components';
import {Link} from 'react-router-dom';
import DashboardBox from './DashboardBox';

const StyledStat = styled(DashboardBox)`
  /* Box */
  padding: 1rem;
  display: grid;
  grid-template-columns: 6.4rem 1fr;
  grid-template-rows: auto auto;
  column-gap: 1.2rem;
  row-gap: 0.4rem;
`;

const Icon = styled.div`
  grid-row: 1 / -1;
  aspect-ratio: 1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  /* Make these dynamic, based on the received prop */
  background-color: var(--c-${(props) => props.color}-100);

  & svg {
    width: 3.2rem;
    height: 3.2rem;
    color: var(--c-${(props) => props.color}-700);
  }
`;

const Title = styled.h5`
  align-self: end;
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--c-white-600);
`;

const Value = styled.p`
  font-size: 2.4rem;
  line-height: 1;
  font-weight: 500;
`;

function Stat({ icon, title, value, color, link }) {
  return (
    <StyledStat>
      <Icon color={color}>{icon}</Icon>
      <Link to={`/blogs?status=${link}`}>
        <Title>{title}</Title>
      </Link>
      <Value>{value}</Value>
    </StyledStat>
  );
}

export default Stat;
