import styled, { css } from 'styled-components';

const sizes = {
  small: css`
    font-size: var(--fs-14);
    padding: 0.6rem 1.2rem;
    text-transform: uppercase;
    font-weight: 500;
    text-align: center;
  `,
  medium: css`
    font-size: var(--fs-16);
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: var(--fs-18);
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const variations = {
  primary: css`
    color: var(--c-white-100);
    background-color: var(--c-green-600);
    &:hover {
      background-color: var(--c-green-700);
    }
  `,
  secondary: css`
    color: var(--c-white-100);
    background: var(--c-blue-600);

    &:hover {
      background-color: var(--c-blue-700);
    }
  `,
  danger: css`
    color: var(--c-red-100);
    background-color: var(--c-red-700);

    &:hover {
      background-color: var(--c-red-800);
    }
  `,
  naked: css`
    display: inline-flex;
    align-items: center;
    flex-direction: row;
    min-width: max-content;
    color: var(--c-white-200);
    background: none;
    transition: color 0.3s;
    padding: 0.6rem;
    &:hover,
    &:focus,
    &:active {
      background-color: var(--c-blue-600);
    }
    & svg {
      width: 2.2rem;
      height: 2.2rem;
      color: var(--color-brand-600);
    }
  `,
  icon: css`
    background: none;
    border: none;
    border-radius: var(--border-radius-sm);
    transition: all 0.2s;

    &:hover {
      background-color: var(--color-grey-100);
    }
  `,
};

const Button = styled.button`
  font-weight: 500;
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);

  ${(props) => sizes[props.size || 'small']}
  ${(props) => variations[props.variation || 'primary']}
`;

// Default props are deprecated in React 18+
// Button.defaultProps = {
//   variation: 'primary',
//   size: 'medium',
// };

export default Button;
