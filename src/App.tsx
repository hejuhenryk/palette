import React from "react";
import { Palette } from "./Palette";
import { initialPalettes } from "./seedPalettes";
import { PaletteT } from "./index.d";
import { GlobalStyle } from "./globalStyles";

const palettesReducer = (state: PaletteT[]): PaletteT[] => {
  return state;
};

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
