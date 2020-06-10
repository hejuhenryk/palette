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
import { usePersistentState } from "./hooks/usePersistentState";
import { Page404 } from "./Page404";

// const palettesReducer = (state: ExtendedPaletteT[]): ExtendedPaletteT[] => {
//   return state;
// };

export const App = () => {
  // const [palettes, /* dispPalettes */] = React.useReducer(
  //   palettesReducer,
  //   initialPalettes.map((p) => extendPalette(p)) as ExtendedPaletteT[]
  // );

  const [palettes, setPalettes] = usePersistentState("palettes_hejuhenryk_2020", initialPalettes/* .map((p) => extendPalette(p)) */)
  const findPalette = (id: string) => palettes.find((p) => p.id === id);
  const handleAddPalette = (p: PaletteT) => {
    setPalettes([...palettes, p])
  }
  const handleRemovePalette = React.useCallback((id: string) => {
    setPalettes(palettes.filter(p=>p.id!==id))
  },[palettes, setPalettes])
  return (
    <>
      <GlobalStyle />
      <Switch>
        <Route
          exact
          path="/"
          render={() => <PalettesList palettes={palettes} removePalette={handleRemovePalette}/>}
        />
        <Route
          exact
          path="/palette/:id/:colorId"
          render={(routeProps) =>
            !findPalette(routeProps.match.params.id) ? (
              <h1>Palette is not found</h1>
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
              <h1>Palette is not found</h1>
            )
          }
        />
        <Route
          exact
          path="/new"
          render={() => <NewPaletteForm paletteNames={palettes.map(p=>p.paletteName)} addPalette={handleAddPalette} />}
        />
        <Route component={Page404}/>
      </Switch>
    </>
  );
};
