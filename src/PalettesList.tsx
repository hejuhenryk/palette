import React from 'react'
import { Link } from 'react-router-dom'
import { PaletteT } from './index.d';


type PalettesListPropsT = {
    palettes: PaletteT[]
}

export const PalettesList: React.FC<PalettesListPropsT> = props => {

    return (
        <div>
            {props.palettes.map(p=><Link to={`/palette/${p.id}`}>{p.paletteName}<span>{p.emoji}</span> </Link>)}
        </div>
    )
};




export default PalettesList
