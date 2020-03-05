import React from "react";
import { PaletteT } from "./seedPalettes";

type PalettePropsT = {
  paletteData: PaletteT;
};

export const Palette: React.FC<PalettePropsT> = props => {
  return (
    <div>
        {/* header */}
      <h3>{props.paletteData.paletteName}</h3>
        {/* color boxes */}
      {props.paletteData.colors.map(c => (
        <div style={{ backgroundColor: `${c.color}` }}>{c.name}</div>
      ))}
        {/* footer */}
    </div>
  );
};
