import styled from 'styled-components';
import useRecentBlogs from './useRecentBlogs';
import Spinner from '../../ui/Spinner';
import Stats from './Stats';
import WritingChart from './WritingChart';
import StatusChart from './StatusChart';
// import Stats from './Stats';
// import { useBlogs } from '../blogs/useBlogs';
import LatestActivity from './LatestActivity';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 2.4rem;
  margin-top: 3rem;
  color: var(--c-white-200);
`;

function DashboardLayout() {
  const { blogs, isLoading, numDays } = useRecentBlogs();

  if (isLoading) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats blogs={blogs} />
      <StatusChart blogs={blogs} />
      <LatestActivity />
      <WritingChart blogs={blogs} numDays={numDays} />
      {/* <div>Statistics</div>
      <div>Today's activity</div>
      <div>Most recent blogs</div> */}
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
