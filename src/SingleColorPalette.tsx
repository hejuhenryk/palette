import React, { useState } from "react";
import { ExtendedPaletteT, keys, ColorModelT } from "./colorHelper";
import styled from "styled-components";
import { ColorBox } from "./ColorBox";
import { Navbar } from "./PaletteNavbar";
import { PaletteFooter } from "./PaletteFooter";
import { useHistory } from "react-router-dom";
import { device } from "./media";

type SingleColorPalettePropsT = {
  paletteId: string;
  colorId: string;
  paletteData: ExtendedPaletteT;
};

export const SingleColorPalette: React.FC<SingleColorPalettePropsT> = ({
  paletteId,
  colorId,
  paletteData,
}) => {
  const [colorMode, setColorMode] = useState("hex" as ColorModelT);
  const history = useHistory();

  const { paletteName, emoji } = paletteData;

  const getShades = (color: string, paletts: ExtendedPaletteT) =>
    keys(paletts.colors)
      .map((k) => paletts.colors[k].find((c) => c.id === color))
      .slice(1);

  const shades = getShades(colorId, paletteData);

  return (
    <PalettePage>
      <Navbar colorMode={colorMode} colorCodingChangeHandler={setColorMode} />
      <Shades>
        {shades.map((s) => (
          <ColorBox
            key={s!.hex}
            color={{ color: s![colorMode], name: s!.name }}
            monochrome={true}
            paletteId={paletteId}
            id={s!.id}
            hiddeLink
          />
        ))}
        <GoBackBox >
          <button onClick={() => history.push(`/palette/${paletteId}`)} >go back</button>
        </GoBackBox>
      </Shades>
      <PaletteFooter paletteName={paletteName} emoji={emoji} />
    </PalettePage>
  );
};

const Shades = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
`;
const PalettePage = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
`;
const GoBackBox = styled.div`
  width: 100%;
  height: 10%;
  background-color: black;
  display: flex;
  flex-flow: column-reverse;
  position: relative;
  @media ${device.mobileL} {
    width: 50%;
    height: 20%;
  };
  @media ${device.tablet} {
    width: 100%; height: 25%; 
  }
  @media ${device.laptop} {
    width: 20%; height: 50%; 
  }

  button {
    text-transform: uppercase;
    width: 5rem;
    height: 1.5rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    outline: none;
    background-color: rgba(255, 255, 255, 0.3);
    border: none;
    font-size: 0.7rem;
    color: white;
    line-height: 1.5rem;
    letter-spacing: 0.08rem;
    opacity: 1;
    text-align: center;
    cursor: grab;
  }
`;
