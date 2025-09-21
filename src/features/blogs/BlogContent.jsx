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

  return (
    <>
      <HeadingSecction>
        <Heading>{title}</Heading>
      </HeadingSecction>
      <div>{categories}</div>
      <div>Author: {author?.name}</div>
      <p>{body}</p>
    </>
  );
}

export default BlogContent;
