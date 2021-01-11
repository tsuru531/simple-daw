import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    user-select: none;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  button {
    padding: 0;
    background: none;
    border: none;
    outline: none;
    appearance: none;
  }
`;
