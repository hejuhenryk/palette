import React from "react";
import { Route, Switch } from "react-router-dom";
import { Palette } from "./Palette";
import { initialPalettes } from "./seedPalettes";
import { GlobalStyle } from "./globalStyles";
import { extendPalette } from "./colorHelper";
// import * as chroma from "chroma.ts";
import { PalettesList } from "./PalettesList";
import { SingleColorPalette } from "./SingleColorPalette";
import { NewPaletteForm } from "./NewPaletteForm";
import { PaletteT } from "./index.d";

// const palettesReducer = (state: ExtendedPaletteT[]): ExtendedPaletteT[] => {
//   return state;
// };

export const App = () => {
  // const [palettes, /* dispPalettes */] = React.useReducer(
  //   palettesReducer,
  //   initialPalettes.map((p) => extendPalette(p)) as ExtendedPaletteT[]
  // );

  const [palettes, setPalettes] = React.useState(initialPalettes/* .map((p) => extendPalette(p)) */)
  const findPalette = (id: string) => palettes.find((p) => p.id === id);
  const handlerAddPalette = (p: PaletteT) => {
    setPalettes([...palettes, p])
  }
  return (
    <>
      <GlobalStyle />
      <Switch>
        <Route
          exact
          path="/"
          render={() => <PalettesList palettes={palettes} />}
        />
        <Route
          exact
          path="/palette/:id/:colorId"
          render={(routeProps) =>
            !findPalette(routeProps.match.params.id) ? (
              <h1>Palette is not fined</h1>
            ) : (
              <SingleColorPalette
                paletteId={routeProps.match.params.id}
                colorId={routeProps.match.params.colorId}
                paletteData={extendPalette(findPalette(routeProps.match.params.id)!)}
              />
            )
          }
        />
        <Route
          exact
          path="/palette/:id"
          render={(routeProps) =>
            findPalette(routeProps.match.params.id) ? (
              <Palette paletteData={extendPalette(findPalette(routeProps.match.params.id)!)} />
            ) : (
              <h1>Palette is not fined</h1>
            )
          }
        />
        <Route
          exact
          path="/new"
          render={() => <NewPaletteForm paletteNames={palettes.map(p=>p.paletteName)} addPalette={handlerAddPalette} />}
        />
      </Switch>
    </>
  );
};

// const getColorRange = (hexColor: string) => [
//   "#fff",
//   hexColor,
//   chroma.color(hexColor).darker(1.4).hex(),
// ];

// console.log(
//   chroma.scale(getColorRange("#bb1299")).mode("lab").colors(10, "hex")
// );
// ["#720059", "#820367", "#920675", "#a20b83", "#b31092", "#c53ea4", "#d774bb", "#e6a4d1", "#f4d1e8", "#ffffff"]
// ["#ffffff", "#f4d1e8", "#e6a4d1", "#d774bb", "#c53ea4", "#b31092", "#a20b83", "#920675", "#820367", "#720059"]

// console.log(extendPalette(initialPalettes[5]));
