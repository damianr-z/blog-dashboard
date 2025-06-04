import styled from "styled-components";

const StyledSelect = styled.select`
  font-size: 1.3rem;
  color: var(--c-white-200);
  padding: 0.6rem 0.8rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--c-grey-200)"
        : "var(--c-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--c-grey-100);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

function Select({ options, value, onChange, ...props }) {
  return (
    <StyledSelect value={value} onChange={onChange} {...props}>
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}

export default Select;