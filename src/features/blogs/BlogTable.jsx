import styled from 'styled-components';

import Spinner from '../../ui/Spinner';
import BlogRow from './BlogRow';
import { useBlogs } from './useBlogs';
// import Table from '../../ui/Table';
// import Empty from '../../ui/Empty';
// import { useSearchParams } from 'react-router-dom';

const Table = styled.div`
  border: 1px solid var(--c-grey-200);
  font-size: 1.4rem;
  background-color: var(--c-white-50);
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  font: var(--fs-20) var(--ff-subheading);
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--c-white-50);
  border-bottom: 1px solid var(--c-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--c-grey-600);
  padding: 1.6rem 2.4rem;
`;

function BlogTable() {
  const { isLoading, blogs } = useBlogs();

  if (isLoading) return <Spinner />;

  return (
    <Table role="table">
      <TableHeader role="row">
        <div></div>
        <div>Blog</div>
        <div>Title</div>
        <div>Author</div>
        <div>Categories</div>
        <div></div>
      </TableHeader>
      {blogs.map((blog) => (
        <BlogRow key={blog.id} blog={blog} />
      ))}
    </Table>
  );
}

export default BlogTable;
