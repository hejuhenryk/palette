import React, { useState } from "react";
import styled from "styled-components";
import { LevelT, ColorModelT } from "./colorHelper";
import { Select, MenuItem, Snackbar, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

import { Link } from "react-router-dom";
import { device } from "./media";

type NavbarPropsT = {
  onChange?: (value: LevelT) => void;
  level?: LevelT;
  colorMode: ColorModelT;
  colorCodingChangeHandler: (value: ColorModelT) => void;
};

export const Navbar: React.FC<NavbarPropsT> = (props) => {
  const [snackbarInfo, setSnackbarInfo] = useState("");

  const colorCodingChangeHandler = (colorMode: ColorModelT) => {
    props.colorCodingChangeHandler(colorMode);
    setSnackbarInfo(`Color format is set to ${colorMode.toLocaleUpperCase()}`);
  };

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number | number[] ) => {
    props.onChange!(newValue as LevelT);
  };

  return (
    <NavbarStyled>
      <Logo>
        <Link to="/">Color Picker</Link>
      </Logo>
      {props.level && (
        <SliderConteiner>
          <Typography id="change-saturation-level" gutterBottom>
          {props.level}
          </Typography>
          <Slider
            value={props.level}
            onChange={handleChange}
            defaultValue={500}
            getAriaValueText={(v: number)=>`${v}`}
            aria-labelledby="change-saturation-level"
            step={100}
            marks
            min={100}
            max={900}
            valueLabelDisplay="auto"
          />
        </SliderConteiner>
      )}
      <SelectContainer>
        <Select
          value={props.colorMode}
          onChange={(e) =>
            colorCodingChangeHandler(e.target.value as ColorModelT)
          }
        >
          <MenuItem value="hex">HEX - #ab12ef</MenuItem>
          <MenuItem value="rgb">RGB - rgb(10, 10, 10)</MenuItem>
          <MenuItem value="rgba">RGBA - rgb(10, 10, 10, 0.7)</MenuItem>
        </Select>
      </SelectContainer>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={snackbarInfo !== ""}
        onClose={() => setSnackbarInfo("")}
        message={<span id="message-id">{snackbarInfo}</span>}
        ContentProps={{
          "aria-describedby": "message-id",
        }}
        action={[
          <IconButton
            onClick={() => setSnackbarInfo("")}
            color="inherit"
            key="close"
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>,
        ]}
        autoHideDuration={3000}
      />
    </NavbarStyled>
  );
};

const NavbarStyled = styled.header`
  width: 100%;
  background-color: #cccccc;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  & :nth-child(1) {
    order: 2;
  }
  & :nth-child(2) {
    order: 1;
  }
  & :nth-child(3) {
    order: 3;
  }
  @media ${device.tablet} {
    flex-wrap: nowrap;
    & :nth-child(1) {
      order: 1;
    }
    & :nth-child(2) {
      order: 2;
    }
    & :nth-child(3) {
      order: 3;
    }
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
  background-color: #000000;
  /* display: none; */
  width: 45%;
  a {
    color: white;
    text-decoration: none;
    font-weight: 800;
  }
  @media ${device.tablet} {
    display: inline-flex;
  }
`;

const SliderConteiner = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-end;
  width: 100%;
  margin: 0 0.5rem;
  height: 4.2rem;
  @media ${device.tablet} {
    flex-direction: row;
  }
`;


const SelectContainer = styled.div`
  width: 45%;
  padding: 0 0.5rem;
  display: flex;
  justify-content: flex-end;
`;
