import styled from 'styled-components';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Button from '../../ui/Button';

import { useMoveBack } from '../../hooks/useMoveBack';
import { useBlog } from './useBlog';
import Spinner from '../../ui/Spinner';
import { useNavigate } from 'react-router-dom';
import { HiArrowUpOnSquare } from 'react-icons/hi2';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import { useDeleteBlog } from './useDeleteBlog';

const HeadingSecction = styled.div`
  display: flex;
  align-items: center;
  gap: 2.4rem;
`;

function BlogDetail() {
  const { data: blog, isLoading } = useBlog();

  if (isLoading) {
    return <Spinner />;
  }

  const { id, title, categories, author, created_at, status, image, body } =
    blog || {};

  return (
    <div>
      <h2>{title}</h2>
      <img src={image} alt={title} />
      <div>{author?.name}</div>
      <div>{body}</div>
      <div>{new Date(created_at).toISOString()}</div>
    </div>
  );
}

export default BlogDetail;
