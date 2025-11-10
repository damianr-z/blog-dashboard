import Spinner from '../../ui/Spinner';
import BlogRow from './BlogRow';
import { useBlogs } from './useBlogs';
import Menus from '../../ui/Menus';
import Table from '../../ui/Table';
import Pagination from '../../ui/Pagination';
import Empty from '../../ui/Empty';

function BlogTable() {
  const { blogs, isLoading, count } = useBlogs();

  if (isLoading) return <Spinner />;
  if (!blogs || blogs.length === 0) return <Empty resourceName="blogs" />;

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
          data={blogs}
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
