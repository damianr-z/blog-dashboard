import styled from 'styled-components';
import Heading from '../../ui/Heading';
import StatusTag from '../../ui/StatusTag';
import Empty from '../../ui/Empty';

const HeadingSecction = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2.4rem;
`;

function BlogContent({ blog }) {
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

  const date = new Date(created_at).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <HeadingSecction>
        <Heading>{title}</Heading>
      </HeadingSecction>
      <StatusTag>#{categories}</StatusTag>
      <div>Author: {author?.name}</div>
      <div>Created on {date}</div>
      <p>{body}</p>
    </>
  );
}

export default BlogContent;
