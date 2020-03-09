import * as chroma from 'chroma.ts'
import { PaletteT } from './index.d'

export type LevelT = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
// enum LT {'50' = 0, '100', '200', '300', '400', '500', '600', '700', '800', '900'};
// let LL : [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]

type ExtendedColorT = {
    name: string;
    id: string; 
    hex: string;
    rgb: string;
    rgba: string; 
}
type ExtendedColorsT = {
    [V in LevelT]: ExtendedColorT[]
}
export type ExtendedPaletteT = Omit<PaletteT, 'colors'> & {colors: ExtendedColorsT};

let k : ExtendedPaletteT = {
    paletteName: 'as',
    emoji: 'daf',
    id: '213',
    colors: {} as ExtendedColorsT
}

export const generatePalette = (initialPalette: PaletteT): ExtendedPaletteT => {
    const levels: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]
    const newPalette = {...initialPalette, colors: {} as ExtendedColorsT}
    for( const lev of levels) {
        newPalette.colors[lev] = []
    }
    for (const color of initialPalette.colors) {
        const colorShades = getColorShades(color.color, levels.length)
        colorShades.forEach( (shade, i) => {
            newPalette.colors[levels[i]].push({
                name: `${color.name} ${levels[i]}`, 
                id: color.name.toLowerCase().replace(/ /g, '-' ), 
                hex: shade, 
                rgb: chroma.color(shade).css(),
                rgba: chroma.color(shade).css().replace('rgb','rgba').replace(')', ',1.0)') 
            })
        })
        // newPalette.colors[color].push()

    }
    return newPalette
}


const getColorRange = (hexColor: string) => ['#fff' , hexColor, chroma.color(hexColor).darker(1.4).hex()]

const getColorShades = (hexColor: string, numOfShades: number) => {
   return chroma.scale(getColorRange(hexColor)).mode('lab').colors(numOfShades, 'hex')
}