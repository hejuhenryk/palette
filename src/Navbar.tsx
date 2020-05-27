import React from "react";
import styled from "styled-components";
import Slider from "rc-slider";
import { LevelT, ColorModelT } from "./colorHelper";
import { Select, MenuItem } from "@material-ui/core"

type NavbarPropsT = {
  onChange: (value: LevelT) => void;
  level: LevelT;
  paletteName: string;
  colorMode: ColorModelT;
  colorCodingChangeHandler: (value: ColorModelT) => void;
};

export const Navbar: React.FC<NavbarPropsT> = (props) => {
  return (
    <NavbarStyled>
      <Logo>
        <a href="#">LogoColorPicker</a>
      </Logo>
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
      <h3 style={{ position: "relative", textAlign: "center", width: "100%" }}>
        {props.paletteName}
      </h3>
      <SelectContainer>
      <Select value={props.colorMode} onChange={(e)=>props.colorCodingChangeHandler(e.target.value as ColorModelT)}>
          <MenuItem value='hex'>HEX - #ab12ef</MenuItem>
          <MenuItem value='rgb'>RGB - rgb(10, 10, 10)</MenuItem>
          <MenuItem value='rgba'>RGBA - rgb(10, 10, 10, 0.7)</MenuItem>
      </Select>
      </SelectContainer>
    </NavbarStyled>
  );
};

const NavbarStyled = styled.header`
  display: flex;
  justify-content: space-between;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
  background-color: #c3c3c3;
  a {
    color: black;
    text-decoration: none;
  }
`;

const SliderConteiner = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0 .5rem;
`;

const StyledSlider = styled(Slider)`
  width: 70%;
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
    width: 100%;
    padding: 0  .5rem;
`;
