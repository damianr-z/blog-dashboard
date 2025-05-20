import Spinner from '../../ui/Spinner';
import BlogRow from './BlogRow';
import { useBlogs } from './useBlogs';
import Menus from '../../ui/Menus';
import Table from '../../ui/Table';

// const Table = styled.div`
//   border: 1px solid var(--c-grey-200);
//   font-size: 1.4rem;
//   background-color: var(--c-white-50);
//   border-radius: 7px;
//   overflow: hidden;
// `;

function BlogTable() {
  const { isLoading, blogs } = useBlogs();

  if (isLoading) return <Spinner />;

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
      </Table>
    </Menus>
  );
}

export default BlogTable;
