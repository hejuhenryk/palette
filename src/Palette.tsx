import React, { useState } from "react";
import styled from "styled-components";
import { ExtendedPaletteT, LevelT } from "./colorHelper";
import { ColorBox } from "./ColorBox";
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';

type PalettePropsT = {
  paletteData: ExtendedPaletteT;
};

type ColorModelT = "hex" | "rgb" | "rgba";

export const Palette: React.FC<PalettePropsT> = props => {
  const [saturation, setSaturation] = useState(900 as LevelT);
  const [colorModel, setColorModel] = useState("hex" as ColorModelT);
  let palette = props.paletteData.colors[saturation];
  return (
    <PaletteStyled>
      {/* header */}
      <h3 style={{ position: "relative", textAlign: "center", width: "100%" }}>
        {props.paletteData.paletteName}
      </h3>
      <Slider
        min={100}
        max={900}
        step={100}
        defaultValue={500}
        // value={saturation}
        onChange={(value: LevelT)=>setSaturation(value)}

      />
      {/* color boxes */}
      <div className="color-boxes">
        {palette.map(c => (
          <ColorBox color={{ name: c.name, color: c[colorModel] }} />
        ))}
      </div>
      {/* footer */}
    </PaletteStyled>
  );
};

const PaletteStyled = styled.div`
  height: 100vh;
  overflow: hidden;

  .color-boxes {
    display: flex;
    flex-wrap: wrap;
    height: 90%;
  }
`;
