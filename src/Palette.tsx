import React from "react";
import styled from 'styled-components'
import { PaletteT } from "./index.d";
import {ColorBox} from './ColorBox'

type PalettePropsT = {
  paletteData: PaletteT;
};

export const Palette: React.FC<PalettePropsT> = props => {
  return (
    <PaletteStyled>
        {/* header */}
      <h3 style={{position: "relative", textAlign: 'center', width: '100%'}}>{props.paletteData.paletteName}</h3>
        {/* color boxes */}
        <div className='color-boxes'>
            {props.paletteData.colors.map(c => <ColorBox color={c}/>)}
        </div>
        {/* footer */}
    </PaletteStyled>
  );
};

const PaletteStyled = styled.div`
    height: 100vh;
    .color-boxes {
        display: flex;
        flex-wrap: wrap;
        height: 90%;
    }
`