import React from "react";
import styled from "styled-components";
import { PaletteT } from "./index.d";
import { useHistory } from "react-router-dom";
import { IconButton } from "@material-ui/core";      
import DelateIcon from "@material-ui/icons/Delete";      
type MiniPalettePropsT = {
  palette: PaletteT;
  removePalette: (id: string)=>void;
};

export const MiniPalette: React.FC<MiniPalettePropsT> = React.memo((props) => {
  const { paletteName, colors, emoji, id } = props.palette;
  const history = useHistory();
  
  const redirectToPalette = () => {
    history.push(`/palette/${id}`);
  };
  const handleRemoveButtonClick = () => {
    props.removePalette(id)
  }

  return (
    <Container>
    <IconButton className="delateBtn" edge="end" onClick={handleRemoveButtonClick} ><DelateIcon /></IconButton>
    <MiniPaletteStyled onClick={redirectToPalette}>
      <div className="colors">
        {colors.map((c) => (
          <Color key={c.color} color={c.color} />
        ))}
      </div>
      <h4 className="palette_name">
        {paletteName}
        <span>{emoji}</span>
      </h4>
    </MiniPaletteStyled>
    </Container>
  );
});

const Container = styled.div`
  position: relative;
  overflow: hidden;
  &:hover .delateBtn{
    opacity: 1;
  }
  .delateBtn {
    position: absolute;
    right: 0;
    top: 0;
    width: 2rem;
    height: 2rem;
    margin: .35rem;
    z-index: 10;
    cursor: default;
    opacity: 0;
    transition: all .2s ease-in-out;
    &:hover {
      background-color: #ff000099;
    }
  }
`;

const MiniPaletteStyled = styled.div`
  border: solid 2px #333;
  background-color: #eee;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 3px;
  cursor: pointer;

  .colors {
    display: flex;
    width: 100%;
    height: 6rem;
    flex-direction: row;
    flex-wrap: wrap;
    border-radius: 5px;
    overflow: hidden;
    background-color: #c3c3c3;
  }
  .palette_name {
    color: black;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.8rem;
    padding: 0.5rem;
    span {
      padding: 0 0.5rem;
    }
  }
`;

type ColorProps = {
  color: string;
};

const Color = styled.div<ColorProps>`
  background-color: ${(p) => p.color};
  height: 20%;
  width: 25%;
`;
