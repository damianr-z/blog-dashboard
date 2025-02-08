import styled, { css } from 'styled-components';

/* ////////////////////////////////// LOGO ///////////////////////////////////*/

const StyledLogo = styled.img`
  height: auto;
  object-fit: contain;

  ${(props) =>
    props.type === 'large' &&
    css`
      width: 400px;
    `}

  ${(props) =>
    props.type === 'small' &&
    css`
      width: 300px;
    `}
`;

export default function Logo({ type }) {
  return <StyledLogo src="/logo.png" alt="logo" type={type} />;
}
