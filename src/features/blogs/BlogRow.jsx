import styled from 'styled-components';
import CreateBlogForm from './CreateBlogForm';

import { useNavigate } from 'react-router-dom';
import { useCreateBlog } from './useCreateBlog';
import { useDeleteBlog } from './useDeleteBlog';
import { HiPencil, HiSquare2Stack, HiTrash, HiEye } from 'react-icons/hi2';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Menus from '../../ui/Menus';
import Table from '../../ui/Table';
import Modal from '../../ui/Modal';
import StatusTag from '../../ui/StatusTag';
import { DEFAULT_IMAGE_URL } from '../../utils/constants';

const Img = styled.img`
  display: block;
  margin: 0 1rem;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
   background-color: #374151;
   fill: green;
  transform: scale(1.5) translateX(-7px);
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
  const navigate = useNavigate();

  function handleDuplicate() {
    createBlog({
      image,
      title: `Copy of ${title}`,
      created_at,
      categories,
      author: author,
    });
  }


  return (
    <Table.Row>
      <Img src={image || DEFAULT_IMAGE_URL} />
      <div>{title}</div>
      <div>{authorName}</div>
      <div>{categories}</div>

      <StatusTag status={status}>{status}</StatusTag>

      <div>{created_at}</div>

      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={blogId} xPos={215} yPos={-60} />
            <Menus.List id={blogId}>
              <Menus.Button
                icon={<HiEye />}
                onClick={() => {
                  console.log('viewing blog', blogId);
                  navigate(`/blogs/${blogId}`);
                }}
              >
                View
              </Menus.Button>

              <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
                Duplicate
              </Menus.Button>

              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Quick Edit</Menus.Button>
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
