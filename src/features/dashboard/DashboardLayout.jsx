import styled from 'styled-components';
import useRecentBlogs from './useRecentBlogs';
import Spinner from '../../ui/Spinner';
import Stats from './Stats';
import WritingChart from './WritingChart';
// import Stats from './Stats';
// import { useBlogs } from '../blogs/useBlogs';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 2.4rem;
  margin-top: 3rem;
`;

function DashboardLayout() {
  const { blogs, isLoading, numDays } = useRecentBlogs();

  if (isLoading) return <Spinner />;
  console.log(blogs);

  return (
    <StyledDashboardLayout>
      <Stats blogs={blogs} />
      <div style={{ gridColumn: '1 / span 2' }}>
        <WritingChart blogs={blogs} numDays={numDays} />
      </div>
      {/* <div>Statistics</div>
      <div>Today's activity</div>
      <div>Most recent blogs</div> */}
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
