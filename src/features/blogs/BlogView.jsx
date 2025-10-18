import styled from 'styled-components';
import BlogContent from './BlogContent';
import Row from '../../ui/Row';
import StatusTag from '../../ui/StatusTag';
import Button from '../../ui/Button';

import { useNavigate } from 'react-router-dom';
import { useMoveBack } from '../../hooks/useMoveBack';
import { useBlog } from './useBlog';
import Spinner from '../../ui/Spinner';
import { usePublish } from './usePublish';
import { useDraft } from './useDraft';
import { useArchive } from './useArchive';
import { useDeleteBlog } from './useDeleteBlog';
import { HiArrowUpOnSquare, HiTrash } from 'react-icons/hi2';
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
  const { data: blog, isLoading } = useBlog();
  const { publishBlog, isPublishing } = usePublish();
  const { draftBlog, isDrafting } = useDraft();
  const { archiveBlog, isArchiving } = useArchive();
  const { deleteBlog, isDeleting } = useDeleteBlog();

  const { status, id: blogId } = blog || {};

  const navigate = useNavigate();
  const moveBack = useMoveBack();

  if (isLoading) return <Spinner />;

  function handlePublish() {
    if (status === 'draft' || status === 'archived') {
      publishBlog({ blogId: blog.id, status: 'published' });
    }
  }

  function handleDraft() {
    if (status === 'published' || status === 'archived') {
      draftBlog({ blogId: blog.id, status: 'draft' });
    }
  }

  function handleArchive() {
    if (status === 'draft' || status === 'published') {
      archiveBlog({ blogId: blog.id, status: 'archived' });
    }
  }

  const statusActions = {
    draft: [
      { label: 'Archive', action: handleArchive, disabled: isArchiving },
      { label: 'Publish', action: handlePublish, disabled: isPublishing }
    ],
    archived: [
      { label: 'Draft', action: handleDraft, disabled: isDrafting },
      { label: 'Publish', action: handlePublish, disabled: isPublishing }
    ],
    published: [
      { label: 'Archive', action: handleArchive, disabled: isArchiving },
      { label: 'Draft', action: handleDraft, disabled: isDrafting }
    ]
  };

  return (
    <Row type="horizontal">
      <Row>
        <BlogContent blog={blog} />
        <Row type="flexEnd">
          <Button variation="naked" onClick={moveBack}>
            &larr; Back
          </Button>
        </Row>
      </Row>
      <Row>
        <Row type="flexEnd" type="horizontal">
          <Button variation="naked" onClick={moveBack}>
            &larr; Back
          </Button>
          <StatusTag status={status}>{status}</StatusTag>
        </Row>
        <Row type="flexEnd">
          <Menus>
            <Modal>
              <Menus.Menu>
                <Menus.Toggle xPos={60} yPos={10} />
                <Menus.List>
                  {status && statusActions[status].map(item => (
                    <Menus.Button
                      key={item.label}
                      onClick={item.action}
                      disabled={item.disabled}
                    >
                      {item.label}
                    </Menus.Button>
                  ))}

                  <Modal.Open opens="delete">
                    <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                  </Modal.Open>
                </Menus.List>

                <Modal.Window name="delete">
                  <ConfirmDelete
                    resourceName="blogs"
                    disabled={isDeleting}
                    onConfirm={() => {
                      deleteBlog(blogId);
                      navigate('/blogs');
                    }}
                  />
                </Modal.Window>
              </Menus.Menu>
            </Modal>
          </Menus>
        </Row>
      </Row>
    </Row>
  );
}

export default BlogView;
