import React from "react";
import { Route, Switch } from "react-router-dom";
import { GlobalStyle } from "./globalStyles";
import { extendPalette } from "./colorHelper";

import { Palette } from "./Palette";
import { PalettesList } from "./PalettesList";
import { SingleColorPalette } from "./SingleColorPalette";
import { PaletteForm } from "./PaletteForm";
import { Page404 } from "./Page404";

import {PaletteContext} from './context/paletteContext'


export const App = () => {

  const {getPalette} = React.useContext(PaletteContext);

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
          render={() => <PaletteForm />}
        />
        <Route
          exact
          path="/edit/:id"
          render={(routeProps) =>
            getPalette(routeProps.match.params.id) ? (
              <PaletteForm paletteToEdit={getPalette(routeProps.match.params.id)!} />
            ) : (
              <h1>Palette is not found</h1>
            )}
        />
        <Route component={Page404}/>
      </Switch>
    </>
  );
};
