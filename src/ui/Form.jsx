import styled, { css } from 'styled-components';

const Form = styled.form`
  ${(props) =>
    props.type === 'regular' &&
    css`
      padding: 2.4rem 4rem;
      display: grid;
      /* Box */
      background-color: var(--c-grey-400);
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.type === 'modal' &&
    css`
      width: 90rem;
    `}
    
  overflow: hidden;
  font-size: var(--fs-20);
`;

Form.defaultProps = {
  type: 'regular',
};

export default Form;
