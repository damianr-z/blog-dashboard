import styled from 'styled-components';
import  useRecentBlogs  from './useRecentBlogs';
import Spinner from '../../ui/Spinner';

// import Stats from './Stats';
// import { useBlogs } from '../blogs/useBlogs';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { blogs, isLoading } = useRecentBlogs();

  if (isLoading) return <Spinner />;
  console.log(blogs);

  return (
    <StyledDashboardLayout>
      <div>Statistics</div>
      <div>Today's activity</div>
      <div>Most recent blogs</div>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
