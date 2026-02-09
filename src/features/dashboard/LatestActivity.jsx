import styled from 'styled-components';
import Heading from '../../ui/Heading';
import DashboardBox from './DashboardBox';
import Row from '../../ui/Row';
import useRecentBlogs from './useRecentBlogs';
import Spinner from '../../ui/Spinner';
import RecentBlog from './RecentBlog';

const StyledRecentBox = styled(DashboardBox)`
  grid-column: 3 / span 2;
  padding-top: 2.4rem;
`;

const RecentList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;
  //remove scroll bar for webkit, firefox, and ms
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

function LatestActivity() {
  const { blogs, isLoading } = useRecentBlogs();
  return (
    <StyledRecentBox>
        <Heading as="h2">Recent Blogs...</Heading>
      {isLoading ? (
        <Spinner />
      ) : blogs?.length > 0 ? (
        <RecentList>
          {blogs.map((blog) => (
            <RecentBlog blog={blog} key={blog.id} />
          ))}
        </RecentList>
      ) : (
        <p>No recent activity to show...</p>
      )}
    </StyledRecentBox>
  );
}

export default LatestActivity;
