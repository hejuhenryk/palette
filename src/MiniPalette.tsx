import React from "react";
import styled from "styled-components";
import { PaletteT } from "./index.d";
import { useHistory } from "react-router-dom";

type MiniPalettePropsT = {
  palette: PaletteT;
  onClick: () => void;
};

export const MiniPalette: React.FC<MiniPalettePropsT> = (props) => {
  const { paletteName, colors, emoji, id } = props.palette;
  const history = useHistory();
  const redirectToPalette = (paletteId: string): void => {
    history.push(`/palette/${paletteId}`);
  };

  return (
    <MiniPaletteStyled onClick={() => redirectToPalette(id)}>
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
  );
};

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
