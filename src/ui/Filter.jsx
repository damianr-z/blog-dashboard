import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--c-grey-200);
  background-color: var(--c-grey-100);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
  `;

const FilterButton = styled.button`
  color: var(--c-white-200);
  background-color: var(--c-grey-100);
  border: none;
  cursor: pointer;
  
  ${(props) =>
    props.active &&
    css`
      background-color: var(--c-blue-600);
      color: var(--c-blue-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.3rem;
  /* To give the same height as select */
  padding: 0.4rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--c-blue-600);
    color: var(--c-blue-50);
  }
`;

function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options.at(0).value;

  function handleClick(value) {
    searchParams.set(filterField, value);
    if (searchParams.get("page")) searchParams.set("page", 1);

    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          onClick={() => handleClick(option.value)}
          active={option.value === currentFilter}
          disabled={option.value === currentFilter}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;