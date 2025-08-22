import Spinner from '../../ui/Spinner';
import BlogRow from './BlogRow';
import { useBlogs } from './useBlogs';
import Menus from '../../ui/Menus';
import Table from '../../ui/Table';
import Pagination from '../../ui/Pagination';
// import Empty from '../../ui/Empty';
import { useSearchParams } from 'react-router-dom';

function BlogTable() {
  const { isLoading, blogs, count } = useBlogs();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  // if (!blogs || blogs.length === 0) return <Empty resourcename="blogs" />;

  // 1) Filter
  const filterValue = searchParams.get('status') || 'all';

  const filteredBlogs =
    filterValue === 'all'
      ? blogs
      : blogs.filter((blog) => blog.status === filterValue);

  // 2) Sort
  const sortBy = searchParams.get('sortBy') || 'created_at-newest';
  const [field, direction] = sortBy.split('-');
  const modifier = direction === 'oldest' ? 1 : -1;
  const sortedBlogs = filteredBlogs
    .slice()
    .sort((a, b) => (new Date(a[field]) - new Date(b[field])) * modifier);

  return (
    <Menus>
      <Table columns="1.2fr 2.5fr 1fr 1fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Title</div>
          <div>Author</div>
          <div>Categories</div>
          <div>Status</div>
          <div>Date</div>
        </Table.Header>
        <Table.Body
          data={sortedBlogs}
          render={(blog) => <BlogRow key={blog.id} blog={blog} />}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BlogTable;
