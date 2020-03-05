import React from 'react'
import {Palette} from './Palette'
import {initialPalettes, PaletteT} from './seedPalettes'

const palettesReducer = (state: PaletteT[]): PaletteT[] => {
  return state
}

export const App = () => {
  const [palettes, dispPalettes] = React.useReducer(palettesReducer, initialPalettes)
  return (
    <div>
      <header>hello app</header>
      <section>
        <Palette paletteData={palettes[1]}/>
      </section>

    </div>
  )
}
