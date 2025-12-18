import styled, { css } from 'styled-components';

const visibility = {
  visible: css`
    font-weight: 500;
    padding-bottom: 0.6rem;
  `,
  hidden: css`
    position: absolute;
    clip: rect(0, 0, , 0);
    margin: -1px;
    border: 0;
    height: 1px;
    width: 1px;
    overflow: hidden;
    white-space: nowrap;
  `,
};

const StyledFormRow = styled.fieldset`
  display: grid;
  align-items: center;
  border: none;

  &:first-child {
    padding-top: 0;
  }

  &:has(input[type='file']) {
    border: 1px solid var(--c-grey-500);
    padding: 1rem;
    background-color: var(--c-grey-200);
    width: 100px;
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
    margin-top: 1.2rem;
  }

  &:not(:last-child) {
    margin-bottom: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
  position: absolute;
  clip: rect(1px, 1px, 1px, 1px);
  padding: 0;
  margin: -1px;
  border: 0;
  height: 1px;
  width: 1px;
  overflow: hidden;
  ${(props) => visibility[props.visibility || 'hidden']}
`;

const Error = styled.span`
  color: var(--c-red-800);
  letter-spacing: 0.04em;
  padding: 0.5rem 0.3rem;
`;

function FormRow({ children, error, label, visibility }) {
  return (
    <StyledFormRow>
      {label && (
        <Label visibility={visibility} htmlFor={children.props.id}>
          {label}
        </Label>
      )}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
