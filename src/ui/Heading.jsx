import styled, { css } from 'styled-components';

// const test = css`
//   text-align: center;
//   ${10 > 5 && "background-color: yellow"}
// `;

const Heading = styled.h1`
  ${(props) =>
    props.as === 'h1' &&
    css`
      font-size: var(--fs-32);
      font-family: var(--ff-heading);
      font-weight: 600;
    `}

  ${(props) =>
    props.as === 'h2' &&
    css`
      font-size: var(--fs-30);
      font-family: var(--ff-subheading);
      font-weight: 600;
    `}
    
    ${(props) =>
    props.as === 'h3' &&
    css`
      font-size: var(--fs-24);
      font-family: var(--ff-subheading);
      font-weight: 500;
    `}
    
  line-height: 1.4;
`;

export default Heading;
