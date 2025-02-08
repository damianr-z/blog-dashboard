import styled from 'styled-components';

const StyledFormRow = styled.fieldset`
  display: grid;
  align-items: center;
  border: none;

  &:first-child {
    padding-top: 0;
  }

  &:nth-child(2) {
  }


  &:nth-child(3) { 
    width: 200px;
  }


  &:has(input[type='file']) {
    border: 1px solid var(--c-white-500);
    padding: 1rem;
    background-color: var(--c-white-400);
    width: 100px;
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }

  &:not(:last-child) {
    margin-bottom: 1.2rem;
  }
`;

const Label = styled.label`
  position: absolute;
  clip: rect(1px, 1px, 1px, 1px);
  padding: 0;
  margin: -1px;
  border: 0;
  height: 1px;
  width: 1px;
  overflow: hidden;
`;

const Error = styled.span`
  color: var(--c-red-800);
  letter-spacing: 0.04em;
  padding: 0.5rem 0.3rem;
`;

function FormRow({ children, error, label }) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
