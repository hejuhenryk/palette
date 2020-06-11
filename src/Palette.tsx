import React, { useState } from "react";
import styled from "styled-components";
import { ExtendedPaletteT, LevelT, ColorModelT } from "./colorHelper";
import { ColorBox } from "./ColorBox";
import "rc-slider/assets/index.css";
import { Navbar } from "./PaletteNavbar";
import { PaletteFooter } from './PaletteFooter';
import { device } from "./media";
import { useHistory } from "react-router-dom";

type PalettePropsT = {
  paletteData: ExtendedPaletteT;
};

export const Palette: React.FC<PalettePropsT> = (props) => {
  const [saturation, setSaturation] = useState(500 as LevelT);
  const [colorModel, setColorModel] = useState("hex" as ColorModelT);
  const { paletteName, emoji, colors, id } = props.paletteData;
  let palette = colors[saturation];
  const history = useHistory();
  return (
    <PaletteStyled>
      <Navbar
        level={saturation}
        onChange={(value: LevelT) => setSaturation(value)}
        colorMode={colorModel}
        colorCodingChangeHandler={setColorModel}
      />

      {/* color boxes */}
      <div className="color-boxes">
        {palette.map((c) => (
          <ColorBox key={c.id} color={{ name: c.name, color: c[colorModel] }} id={c.id} paletteId={id} />
        ))}
      </div>
      {/* footer */}
          <PaletteFooter paletteName={paletteName} emoji={emoji} handleEdit={()=>history.push(`/edit/${props.paletteData.id}`)}/>
    </PaletteStyled>
  );
};

const PaletteStyled = styled.div`
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .color-boxes {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    background-color: rgba(255,255,255);
    align-content: flex-start;
    height: 100%;
    @media ${device.tablet} {
      flex-direction: row;
    }
  }
`;

