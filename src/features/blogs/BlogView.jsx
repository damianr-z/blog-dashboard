import styled from 'styled-components';
import BlogContent from './BlogContent';
import Row from '../../ui/Row';
import StatusTag from '../../ui/StatusTag';
import Button from '../../ui/Button';

import { useNavigate } from 'react-router-dom';
import { useMoveBack } from '../../hooks/useMoveBack';
import { useBlog } from './useBlog';
import Spinner from '../../ui/Spinner';
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
  const { deleteBlog, isDeleting } = useDeleteBlog();

  const { status } = blog || {};

  const navigate = useNavigate();
  const moveBack = useMoveBack();

  if (isLoading) return <Spinner />;
  return (
    <Row type="horizontal">
      <Row>
        <BlogContent blog={blog} />
        <Row type="flexEnd">
          <Button variation="secondary" onClick={moveBack}>
            Back
          </Button>
        </Row>
      </Row>
      <Row type="flexEnd"></Row>
      <Row>
        <Row type="flexEnd" type="vertical">
          <StatusTag status={status}>{status}</StatusTag>
          <Button variation="naked" onClick={moveBack}>
            &larr; Back
          </Button>
        </Row>
      </Row>
      {/* <div>
        <img src={image} alt={title} />
        <div>{author?.name}</div>
        <div>{body}</div>
        <div>
          {new Date(created_at).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
      </div> */}
    </Row>
  );
}

export default BlogView;
