import styled from 'styled-components';
import CreateBlogForm from './CreateBlogForm';

import { useCreateBlog } from './useCreateBlog';
import { useDeleteBlog } from './useDeleteBlog';
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Menus from '../../ui/Menus';
import Table from '../../ui/Table';
import Modal from '../../ui/Modal';

console.log('table:', Table.Row);

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
  const { isDeleting, deleteBlog } = useDeleteBlog();
  const { isCreating, createBlog } = useCreateBlog();

  const { image, id: blogId, title, author: authorId, body, categories } = blog;

  function handleDuplicate() {
    createBlog({
      image,
      title: `Copy of ${title}`,
      body,
      categories,
      authorId: authorId,
    });
  }
  function featuredContent() {
    if (body.length < 100) return body;
    let truncated = body.slice(0, 90);
    return truncated.slice(0, truncated.lastIndexOf(' ')) + '...';
  }

  return (
    <Table.Row>
      <Img src={image} />
      <div>{title}</div>
      <div>{featuredContent()}</div>
      <div>{authorId}</div>
      <div>{categories}</div>

      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={blogId} />

            <Menus.List id={blogId}>
              <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
                Duplicate
              </Menus.Button>

              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit">
              <CreateBlogForm blogToEdit={blog} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="blogs"
                disabled={isDeleting}
                onConfirm={() => deleteBlog(blogId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
        {/* {showForm && <CreateBlogForm blogToEdit={blog} />} */}
      </div>
    </Table.Row>
  );
}

export default BlogRow;
