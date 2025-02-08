import styled from 'styled-components';

const TextArea = styled.textarea`
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--c-white-500);
  border-radius: var(--border-radius-sm);
  background-color: var(--c-white-400);
  box-shadow: var(--shadow-sm);
  width: 100%;
  height: 28rem;
  overflow: scroll;
`;

export default TextArea;
