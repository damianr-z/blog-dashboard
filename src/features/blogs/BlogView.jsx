import styled from 'styled-components';
import BlogContent from './BlogContent';
import Row from '../../ui/Row';
import StatusTag from '../../ui/StatusTag';
import Button from '../../ui/Button';

import { useNavigate } from 'react-router-dom';
import { useMoveBack } from '../../hooks/useMoveBack';
import { useBlog } from './useBlog';
import Spinner from '../../ui/Spinner';
import { useUpdateBlogStatus } from './useUpdateBlogStatus';
import { useConfirmAuthorId } from './useConfirmAuthorId';
import { useDeleteBlog } from './useDeleteBlog';
import { HiTrash, HiArchiveBox } from 'react-icons/hi2';
import { GrDocumentTransfer } from 'react-icons/gr';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { FiEdit } from 'react-icons/fi';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Menus from '../../ui/Menus';
import Modal from '../../ui/Modal';
import Table from '../../ui/Table';

const HeadingSecction = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2.4rem;
`;

function BlogView() {
  const { blog, isLoading } = useBlog();
  const { deleteBlog, isDeleting } = useDeleteBlog();
  const { updateBlogStatus, isUpdating } = useUpdateBlogStatus();
  const { isOwner, handleDelete } = useConfirmAuthorId({
    author: blog?.author,
  });

  const { status, id: blogId } = blog || {};

  const navigate = useNavigate();
  const moveBack = useMoveBack();

  if (isLoading) return <Spinner />;

  function handleUpdateStatus(newStatus) {
    updateBlogStatus({ status: newStatus });
  }

  function getStatusActions() {
    const actions = (() => {
      switch (status) {
        case 'draft':
          return [
            {
              label: 'Archive',
              action: () => handleUpdateStatus('archived'),
              disabled: isUpdating,
            },
            {
              label: 'Publish',
              action: () => handleUpdateStatus('published'),
              disabled: isUpdating,
            },
          ];
        case 'archived':
          return [
            {
              label: 'Draft',
              action: () => handleUpdateStatus('draft'),
              disabled: isUpdating,
            },
            {
              label: 'Publish',
              action: () => handleUpdateStatus('published'),
              disabled: isUpdating,
            },
          ];
        case 'published':
          return [
            {
              label: 'Archive',
              action: () => handleUpdateStatus('archived'),
              disabled: isUpdating,
            },
            {
              label: 'Draft',
              action: () => handleUpdateStatus('draft'),
              disabled: isUpdating,
            },
          ];
        default:
          return [];
      }
    })();

    return actions;
  }

  return (
    <Row type="horizontal">
      <Row>
        <BlogContent blog={blog} />
        <Row flexjustify="flexEnd">
          <Button variation="naked" onClick={moveBack}>
            &larr; Back
          </Button>
        </Row>
      </Row>
      <Row>
        <Row flexjustify="flexEnd" type="horizontal">
          <Button variation="naked" onClick={moveBack}>
            &larr; Back
          </Button>
          <StatusTag status={status}>{status}</StatusTag>
        </Row>
        <Row flexjustify="flexEnd">
          <Menus>
            <Modal>
              <Menus.Menu>
                <Menus.Toggle xPos={60} yPos={10} />
                <Menus.List>
                  {getStatusActions().map((item) => (
                    <Menus.ListItem
                      key={item.label}
                      icon={
                        item.label === 'Publish' ? (
                          <IoDocumentTextOutline />
                        ) : item.label === 'Archive' ? (
                          <HiArchiveBox />
                        ) : item.label === 'Draft' ? (
                          <GrDocumentTransfer />
                        ) : null
                      }
                      onClick={item.action}
                      disabled={item.disabled}
                    >
                      {item.label}
                    </Menus.ListItem>
                  ))}

                  {isOwner ? (
                    <Modal.Open opens="delete">
                      <Menus.ListItem icon={<HiTrash />}>Delete</Menus.ListItem>
                    </Modal.Open>
                  ) : (
                    <Menus.ListItem icon={<HiTrash />} onClick={handleDelete}>
                      Delete
                    </Menus.ListItem>
                  )}
                </Menus.List>
              </Menus.Menu>
              <Modal.Window name="delete">
                <ConfirmDelete
                  resourceName="blogs"
                  disabled={isDeleting}
                  onConfirm={() => {
                    deleteBlog(blogId);
                    navigate(-1);
                  }}
                />
              </Modal.Window>
            </Modal>
          </Menus>
        </Row>
      </Row>
    </Row>
  );
}

export default BlogView;
