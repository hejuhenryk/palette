import React, { useState } from "react";
import styled from "styled-components";
import Slider from "rc-slider";
import { LevelT, ColorModelT } from "./colorHelper";
import { Select, MenuItem, Snackbar, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

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
    }


  return (
    <NavbarStyled>
      <Logo>
        <Link to="/">LogoColorPicker</Link>
      </Logo>
      {props.level && (
        <SliderConteiner>
          <span>Level: {props.level}</span>
          <StyledSlider
            min={100}
            max={900}
            step={100}
            defaultValue={props.level}
            onChange={
              props.onChange
            } /* {(value: LevelT) => setSaturation(value)} */
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
          <IconButton onClick={() => setSnackbarInfo("")} color="inherit" key="close" aria-label="close">
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
  & :nth-child(1) {order: 2}
  & :nth-child(2) {order: 1}
  & :nth-child(3) {order: 3}
  @media ${device.tablet} {
    flex-wrap: nowrap;
    & :nth-child(1) {order: 1}
  & :nth-child(2) {order: 2}
  & :nth-child(3) {order: 3}
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
  align-items: center;
  width: 100%;
  margin: 0 0.5rem;
  @media ${device.tablet} {
    flex-direction: row;
  }
`;

const StyledSlider = styled(Slider)`
  width: 100%;
  margin: 0.5rem;
  display: inline-flex;
  padding: 0;
  align-items: center;
  .rc-slider-track {
    display: none;
  }
  .rc-slider-rail {
    height: 10px;
    border-radius: 5px;
  }
  .rc-slider-handle {
    background-color: #009500;
    border: none;
    margin: 0;
    height: 20px;
    width: 20px;
    :focus,
    :hover,
    :active {
      outline: none;
      box-shadow: none;
    }
  }
  :focus {
    outline: none;
  }
`;

const SelectContainer = styled.div`
  width: 45%;
  padding: 0 0.5rem;
  display: flex; 
  justify-content: flex-end;
`;
