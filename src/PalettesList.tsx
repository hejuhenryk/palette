import React from 'react'
import { Link } from 'react-router-dom'
import { PaletteT } from './index.d';
import { MiniPalette } from './MiniPalette';


type PalettesListPropsT = {
    palettes: PaletteT[]
}

export const PalettesList: React.FC<PalettesListPropsT> = props => {

    return (
    <div style={{textDecoration: "none"}}>
            {props.palettes.map(p=><MiniPalette palette={p} key={p.id} />)}
        </div>
    )
};




export default PalettesList
