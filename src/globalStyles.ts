import { createGlobalStyle } from "styled-components";
import background from "./bg.svg";

export const GlobalStyle = createGlobalStyle`

html {
  box-sizing: border-box;
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
  height: 100%;
    width: 100%;
}
body {
  height: 100%;
    width: 100%;
}
#root {
  height: 100%;
  width: 100%;
  /* background by SVGBackgrounds.com */
  background-color: #000000;
  background-image: url(${background});
}

*, *:before, *:after {
  box-sizing: inherit;
}

body, h1, h2, h3, h4, h5, h6, p, ol, ul {
  margin: 0;
  padding: 0;
  font-weight: normal;
}

ol, ul {
  list-style: none;
}

img {
  max-width: 100%;
  height: auto;
}
`;
