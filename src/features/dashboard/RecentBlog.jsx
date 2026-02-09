import styled from 'styled-components';
import { Link } from 'react-router-dom';
import StatusTag from '../../ui/StatusTag';
import Button from '../../ui/Button';
import Heading from '../../ui/Heading';
import Row from '../../ui/Row';

const StyledRecentBlog = styled.li`
  display: grid;
  grid-template-columns: minmax(min-content, 2fr) 9rem 9rem;
  grid-auto-flow: row;
  gap: 1.2rem;
  align-items: start;
  width: 100%;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--c-grey-100);
  &:first-child {
    border-top: 1px solid var(--c-grey-100);
  }
`;



const Title = styled(Heading)`
  margin: 0;
  overflow-wrap: anywhere;
  word-break: break-word;
  font-size: var(--fs-18);
`;

function RecentBlog({ blog }) {
  const { id: blogId, status, title } = blog;

  return (
    <StyledRecentBlog>
      <Title as="h4">{title}</Title>
      <StatusTag status={status}>{status}</StatusTag>
      <Button variation="secondary" as={Link} to={`/blogs/${blogId}`}>
        View Blog
      </Button>
    </StyledRecentBlog>
  );
}

export default RecentBlog;
