import Row from '../ui/Row';
import Heading from '../ui/Heading';
import { getBlogs } from '../services/apiBlogs';
import BlogTable from '../features/blogs/BlogTable';
import BlogTableOps from '../features/blogs/BlogTableOps';

function Blogs() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All blogs</Heading>
        <BlogTableOps />
      </Row>
      <Row>
        <BlogTable />
      </Row>
    </>
  );
}

export default Blogs;
