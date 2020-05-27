import React, { useState } from "react";
import styled from "styled-components";
import { ExtendedPaletteT, LevelT, ColorModelT } from "./colorHelper";
import { ColorBox } from "./ColorBox";
import "rc-slider/assets/index.css";
import { Navbar } from "./Navbar";
import { Snackbar, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close"

type PalettePropsT = {
  paletteData: ExtendedPaletteT;
};

export const Palette: React.FC<PalettePropsT> = (props) => {
  const [saturation, setSaturation] = useState(500 as LevelT);
  const [colorModel, setColorModel] = useState("hex" as ColorModelT);
  const [snackbarInfo, setSnackbarInfo] = useState("Hello");
  let palette = props.paletteData.colors[saturation];

  const handleColorCodingChange = (coding: ColorModelT) => {
    setColorModel(coding);
    setSnackbarInfo(`Color format is set to ${coding.toLocaleUpperCase()}`)
  }

  return (
    <PaletteStyled>
      {/* header */}

      <Navbar
        paletteName={props.paletteData.paletteName}
        level={saturation}
        onChange={(value: LevelT) => setSaturation(value)}
        colorMode={colorModel}
        colorCodingChangeHandler={handleColorCodingChange}
      />

      {/* color boxes */}
      <div className="color-boxes">
        {palette.map((c) => (
          <ColorBox color={{ name: c.name, color: c[colorModel] }} />
        ))}
      </div>
      {/* footer */}
      {/* Snackbar with Materiall IU */}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={snackbarInfo !== ""}
        onClose={() => setSnackbarInfo("")}
        message={<span id='message-id'>{snackbarInfo}</span>}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        action={[
          <IconButton color='inherit' key='close' aria-lavel='close' >
            <CloseIcon onClick={()=>setSnackbarInfo("")} />
          </IconButton>
        ]}
        autoHideDuration={3000}
      />
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
