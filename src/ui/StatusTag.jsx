import styled from "styled-components";

const statusToTagName = {
    draft: 'yellow',
    published: 'green',
    archived: 'red',
};

const Tag = styled.span`
  width: fit-content;
  text-transform: uppercase;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.4rem 1.2rem;
  border-radius: 100px;

  /* Make these dynamic, based on the received prop */
  color: var(--c-${(props) => props.$type}-700);
  background-color: var(--c-${(props) => props.$type}-100);
`;

// I am uusing $type instead of type to avoid react warning about invalid DOM attribute

function StatusTag({ status, children}) {
  const type = statusToTagName[status.toLowerCase()] || 'gray';
  return <Tag $type={type}>{children || status}</Tag>;
}

export default StatusTag;
