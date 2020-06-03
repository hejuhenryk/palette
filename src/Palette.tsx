import React, { useState } from "react";
import styled from "styled-components";
import { ExtendedPaletteT, LevelT, ColorModelT } from "./colorHelper";
import { ColorBox } from "./ColorBox";
import "rc-slider/assets/index.css";
import { Navbar } from "./Navbar";
import { PaletteFooter } from './PaletteFooter';

type PalettePropsT = {
  paletteData: ExtendedPaletteT;
};

export const Palette: React.FC<PalettePropsT> = (props) => {
  const [saturation, setSaturation] = useState(500 as LevelT);
  const [colorModel, setColorModel] = useState("hex" as ColorModelT);
  const { paletteName, emoji, colors, id } = props.paletteData;
  let palette = colors[saturation];

  return (
    <PaletteStyled>
      {/* header */}

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
          <PaletteFooter paletteName={paletteName} emoji={emoji} />
      />
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
    flex-wrap: wrap;
    height: 100%;
  }
`;

