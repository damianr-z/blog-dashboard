import styled from 'styled-components';

import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import StatusTag from '../../ui/StatusTag';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import Empty from '../../ui/Empty';

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
  gap: 2.4rem;
`;

function BlogView() {
  const { data: blog, isLoading } = useBlog();
  const { deleteBlog, isDeleting } = useDeleteBlog();

  const navigate = useNavigate();
  const moveBack = useMoveBack();

  if (isLoading) return <Spinner />;
  if (!blog) return <Empty resourceName="blog" />;

  const {
    id: blogId,
    title,
    categories,
    author,
    created_at,
    status,
    image,
    body,
  } = blog || {};


  return (
    <>
      <Row>
        <HeadingSecction>
          <Heading>{title}</Heading>
          <StatusTag status={status}>{status}</StatusTag>
        </HeadingSecction>
      </Row>
      <ButtonGroup>
          <Button variation='naked' onClick={moveBack}>&larr; Back</Button>
      </ButtonGroup>

      <ButtonGroup>
          <Button variation='secondary' onClick={moveBack}>Back</Button>
      </ButtonGroup>
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
    </>
  );
}

export default BlogView;
