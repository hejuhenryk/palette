import React from "react";
import { Route, Switch } from "react-router-dom";
import { GlobalStyle } from "./globalStyles";
import { extendPalette } from "./colorHelper";

import { Palette } from "./Palette";
import { PalettesList } from "./PalettesList";
import { SingleColorPalette } from "./SingleColorPalette";
import { NewPaletteForm } from "./NewPaletteForm";
import { Page404 } from "./Page404";

import {PaletteContext} from './context/paletteContext'


export const App = () => {

  const {getPalette, palettes, addPalette} = React.useContext(PaletteContext);

  return (
    <>
      <GlobalStyle />
      <Switch>
        <Route
          exact
          path="/"
          render={() => <PalettesList />}
        />
        <Route
          exact
          path="/palette/:id/:colorId"
          render={(routeProps) =>
              !getPalette(routeProps.match.params.id) ? (
              <h1>Palette is not found</h1>
            ) : (
              <SingleColorPalette
                paletteId={routeProps.match.params.id}
                colorId={routeProps.match.params.colorId}
                paletteData={extendPalette(getPalette(routeProps.match.params.id)!)}
              />
            )
          }
        />
        <Route
          exact
          path="/palette/:id"
          render={(routeProps) =>
            getPalette(routeProps.match.params.id) ? (
              <Palette paletteData={extendPalette(getPalette(routeProps.match.params.id)!)} />
            ) : (
              <h1>Palette is not found</h1>
            )
          }
        />
        <Route
          exact
          path="/new"
          render={() => <NewPaletteForm paletteNames={palettes.map(p=>p.paletteName)} addPalette={addPalette} />}
        />
        <Route component={Page404}/>
      </Switch>
    </>
  );
};
