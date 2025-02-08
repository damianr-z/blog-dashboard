import Row from '../ui/Row';
import Heading from '../ui/Heading';
import { useEffect } from 'react';
import { getBlogs } from '../services/apiBlogs';
import BlogTable from '../features/blogs/BlogTable';

function Blogs() {
  useEffect(() => {
    getBlogs().then((blogs) => console.log(blogs));
  }, []);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All blogs</Heading>
        <p>Filter / Sort</p>
      </Row>
      <Row>
        <BlogTable />
      </Row>
    </>
  );
}

export default Blogs;
