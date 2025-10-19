import styled, { css } from 'styled-components';

const Row = styled.div`
  display: flex;
  color: var(--c-white-200);

  ${(props) =>
    props.type === 'horizontal' &&
    css`
      justify-content: space-between;
      align-items: baseline;
    `}

  ${(props) =>
    props.type === 'vertical' &&
    css`
      flex-direction: column;
      justify-content: space-between;
      gap: 1.6rem;
    `}
  ${(props) =>
    props.flexjustify === 'flexEnd' &&
    css`
      min-width: max-content;
      justify-content: flex-end;
      align-content: flex-end;
      gap: 1.2rem;
    `}
`;

Row.defaultProps = {
  type: 'vertical',
};

export default Row;
