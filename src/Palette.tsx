import React, { useState } from "react";
import styled from "styled-components";
import { ExtendedPaletteT, LevelT, ColorModelT } from "./colorHelper";
import { ColorBox } from "./ColorBox";
import "rc-slider/assets/index.css";
import { Navbar } from "./Navbar";
import { Snackbar, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

type PalettePropsT = {
  paletteData: ExtendedPaletteT;
};

export const Palette: React.FC<PalettePropsT> = (props) => {
  const [saturation, setSaturation] = useState(500 as LevelT);
  const [colorModel, setColorModel] = useState("hex" as ColorModelT);
  const [snackbarInfo, setSnackbarInfo] = useState("");
  const { paletteName, emoji, colors } = props.paletteData;
  let palette = colors[saturation];

  const handleColorCodingChange = (coding: ColorModelT) => {
    setColorModel(coding);
    setSnackbarInfo(`Color format is set to ${coding.toLocaleUpperCase()}`);
  };

  return (
    <PaletteStyled>
      {/* header */}

      <Navbar
        level={saturation}
        onChange={(value: LevelT) => setSaturation(value)}
        colorMode={colorModel}
        colorCodingChangeHandler={handleColorCodingChange}
      />

      {/* color boxes */}
      <div className="color-boxes">
        {palette.map((c) => (
          <ColorBox key={c.id} color={{ name: c.name, color: c[colorModel] }} />
        ))}
      </div>
      {/* footer */}
      <Footer>
        {paletteName}
        <span className="emoji">{emoji}</span>
      </Footer>
      {/* Snackbar with Materiall IU */}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={snackbarInfo !== ""}
        onClose={() => setSnackbarInfo("")}
        message={<span id="message-id">{snackbarInfo}</span>}
        ContentProps={{
          "aria-describedby": "message-id",
        }}
        action={[
          <IconButton color="inherit" key="close" aria-lavel="close">
            <CloseIcon onClick={() => setSnackbarInfo("")} />
          </IconButton>,
        ]}
        autoHideDuration={3000}
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

const Footer = styled.footer`
  padding:  0 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 3rem;
  .emoji {
    size: 2rem;
    margin: 0 .4rem;
  }
`;
