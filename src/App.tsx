import React from "react";
import { Palette } from "./Palette";
import { initialPalettes } from "./seedPalettes";
import { PaletteT } from "./index.d";
import { GlobalStyle } from "./globalStyles";
import {generatePalette} from './colorHelper'
import * as chroma from 'chroma.ts'

const palettesReducer = (state: PaletteT[]): PaletteT[] => {
  return state;
};
const getColorRange = (hexColor: string) => ['#fff' , hexColor, chroma.color(hexColor).darker(1.4).hex()]

console.log(    chroma.scale(getColorRange('#bb1299')).mode('lab').colors(10, 'hex'))
// ["#720059", "#820367", "#920675", "#a20b83", "#b31092", "#c53ea4", "#d774bb", "#e6a4d1", "#f4d1e8", "#ffffff"]
// ["#ffffff", "#f4d1e8", "#e6a4d1", "#d774bb", "#c53ea4", "#b31092", "#a20b83", "#920675", "#820367", "#720059"]

console.log(generatePalette(initialPalettes[0]))

export const App = () => {
  const [palettes, dispPalettes] = React.useReducer(
    palettesReducer,
    initialPalettes
  );
  return (
    <>
      <GlobalStyle />
      {/* <header style={{position: "relative", textAlign: 'center', width: '100%'}}>hello app</header> */}
      <Palette paletteData={palettes[1]} />
    </>
  );
};
