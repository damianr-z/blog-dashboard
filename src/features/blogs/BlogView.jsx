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
import ConfirmDelete from '../../ui/ConfirmDelete';
import { HiArrowUpOnSquare } from 'react-icons/hi2';
import Modal from '../../ui/Modal';

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

  const { status } = blog || {};

  const navigate = useNavigate();
  const moveBack = useMoveBack();

  if (isLoading) return <Spinner />;

  function handlePublish() {
    if (blog?.status === 'draft' || blog?.status === 'archived') {
      publishBlog({ blogId: blog.id, status: 'published' });
    }
  }

  function handleDraft() {
    if (blog?.status === 'published' || blog?.status === 'archived') {
      draftBlog({ blogId: blog.id, status: 'draft' });
    }
  }

  function handleArchive() {
    if (blog?.status === 'draft' || blog?.status === 'published') {
      archiveBlog({ blogId: blog.id, status: 'archived' });
    }
  }

  return (
    <Row type="horizontal">
      <Row>
        <BlogContent blog={blog} />
        <Row type="flexEnd">
          <Button variation="naked" onClick={moveBack}>
            &larr; Back
          </Button>
          {status === 'draft' && (
            <Row type="flexEnd">
              <Button
                variation="secondary"
                onClick={handleArchive}
                disabled={isArchiving || isDeleting}
              >
                Archive
              </Button>
              <Button
                variation="primary"
                onClick={handlePublish}
                disabled={isPublishing || isDeleting}
              >
                Publish
              </Button>
            </Row>
          )}
          {status === 'archived' && (
            <Row type="flexEnd">
              <Button
                variation="secondary"
                onClick={handleDraft}
                disabled={isDrafting || isDeleting}
              >
                Draft
              </Button>
              <Button
                variation="primary"
                onClick={handlePublish}
                disabled={isPublishing || isDeleting}
              >
                Publish
              </Button>
            </Row>
          )}
          {status === 'published' && (
            <Row type="flexEnd">
              <Button
                variation="secondary"
                onClick={handleArchive}
                disabled={isArchiving || isDeleting}
              >
                Archive
              </Button>
              <Button
                variation="primary"
                onClick={handleDraft}
                disabled={isDrafting || isDeleting}
              >
                Draft
              </Button>
            </Row>
          )}
        </Row>
      </Row>
      <Row>
        <Row type="flexEnd" type="vertical">
          <StatusTag status={status}>{status}</StatusTag>
          <Button variation="naked" onClick={moveBack}>
            &larr; Back
          </Button>
        </Row>
      </Row>
    </Row>
  );
}

export default BlogView;
