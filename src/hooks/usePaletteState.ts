import { usePersistentState } from './usePersistentState';
import { PaletteT } from '../index.d';

export type usePaletteStateT = {
    palettes: PaletteT[];
    addPalette: (p: PaletteT) => void;
    removePalette: (id: string) => void;
    getPalette: (id: string) => PaletteT | undefined;
    replacePalette: (id: string, newPalette: PaletteT) => PaletteT[];
}

export const usePaletteState = (storageKey: string, initialPalettes: PaletteT[]): usePaletteStateT => {
    const [state, setState] = usePersistentState(storageKey, initialPalettes)
    return {
        palettes: state, 
        addPalette: (p: PaletteT) => {setState([...state, p])},
        removePalette: (id: string) => { setState(state.filter(p=>p.id!==id)) },
        getPalette: (id: string) => state.find(p=>p.id === id),
        replacePalette: (id: string, newPalette: PaletteT) => state.map(p=>p.id === id ? newPalette : p)
    }
}