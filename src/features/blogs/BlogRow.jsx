import { useState } from 'react';
import styled from 'styled-components';
import CreateBlogForm from './CreateBlogForm';

import { useCreateBlog } from './useCreateBlog';
import { useDeleteBlog } from './useDeleteBlog';
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  font: var(--fs-18) var(--ff-text);
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--c-white-400);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Blog = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--c-grey-600);
  font-family: 'Sono';
`;

function BlogRow({ blog }) {
  const [showForm, setShowForm] = useState(false);
  const { isDeleting, deleteBlog } = useDeleteBlog();
  const { isCreating, createBlog } = useCreateBlog();

  const { image, id: blogId, title, authorId, categories } = blog;

  function handleDuplicate() {
    // createBlog({
    //   title: `Copy of ${title}`,
    //   body,
    //   categories,
    //   author,
    //   image
    // });
  }

  return (
    <>
      <TableRow role="row">
        <Img src={image} />
        <Blog>{blogId}</Blog>
        <div>{title}</div>
        <div>{authorId}</div>
        <div>{categories}</div>

        <div>
          <button onClick={handleDuplicate}>
            <HiSquare2Stack />
          </button>
          <button onClick={() => setShowForm((show) => !show)}>
            <HiPencil />
          </button>
          <button onClick={() => deleteBlog(blogId)} disabled={isDeleting}>
            <HiTrash />
          </button>
        </div>
      </TableRow>
      {showForm && <CreateBlogForm blogToEdit={blog} />}
    </>
  );
}

export default BlogRow;
