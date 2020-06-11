import React, {createContext} from 'react';
import { usePaletteState, usePaletteStateT } from '../hooks/usePaletteState';
import { initialPalettes } from '../seedPalettes';


export const PaletteContext = createContext({ } as usePaletteStateT);

export const PaletteProvider: React.FC = ({children}) => {
    const {palettes, getPalette, addPalette, removePalette, replacePalette} = usePaletteState("palettes_hejuhenryk_2020", initialPalettes)
    return (
        <PaletteContext.Provider value={{palettes, getPalette, addPalette, removePalette, replacePalette}} >
            {children}
        </PaletteContext.Provider>
    )
}