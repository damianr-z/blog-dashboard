import styled from 'styled-components';
import CreateBlogForm from './CreateBlogForm';

import { useCreateBlog } from './useCreateBlog';
import { useDeleteBlog } from './useDeleteBlog';
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Menus from '../../ui/Menus';
import Table from '../../ui/Table';
import Modal from '../../ui/Modal';
import Tag from '../../ui/ColorTag';

const TableRow = styled.div`
  display: grid;
  grid-template-columns: fit-content 2.8fr 0.5fr 1fr 1fr 0.5fr 0.5fr;
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
  margin: 0 1rem;
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

  const {
    image,
    id: blogId,
    title,
    author,
    created_at,
    categories,
    status,
  } = blog;
  const authorName = author?.name || 'Unknown';

  function handleDuplicate() {
    createBlog({
      image,
      title: `Copy of ${title}`,
      created_at,
      categories,
      author: author,
    });
  }

  // function featuredContent() {
  //   if (body.length < 100) return body;
  //   let truncated = body.slice(0, 90);
  //   return truncated.slice(0, truncated.lastIndexOf(' ')) + '...';
  // }

  const statusToTagName = {
    draft: 'yellow',
    published: 'green',
    archived: 'red',
  };

  return (
    <Table.Row>
      <Img src={image} />
      <div>{title}</div>
      <div>{authorName}</div>
      <div>{categories}</div>
      <div>
        <Tag type={statusToTagName[status.toLowerCase()]}>{status}</Tag>
      </div>
      <div>{created_at}</div>

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

            <Modal.Window name="edit" type="large">
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
      </div>
    </Table.Row>
  );
}

export default BlogRow;
