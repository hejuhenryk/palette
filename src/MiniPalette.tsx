import React from "react";
import styled from "styled-components";
import { PaletteT } from "./index.d";
import { Link } from "react-router-dom";

type MiniPalettePropsT = {
  palette: PaletteT;
};

export const MiniPalette: React.FC<MiniPalettePropsT> = (props) => {
  const { paletteName, colors, emoji, id } = props.palette;
  return (
    <MiniPaletteStyled>
      <Link to={`/palette/${id}`}>
        <div className="colors">
          {colors.map((c) => (
            <Color key={c.color} color={c.color} />
          ))}
        </div>
        <h4 className="palette_name">
          {paletteName}
          <span>{emoji}</span>
        </h4>
      </Link>
    </MiniPaletteStyled>
  );
};

const MiniPaletteStyled = styled.div`
  border: solid 2px #c3c3c3;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 3px;
  a {
      text-decoration: none;
  }
  .colors {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .palette_name {
    color: black;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      padding: 0 0.5rem;
    }
  }
`;

type ColorProps = {
  // key: string;
  color: string;
};

const Color = styled.div<ColorProps>`
  background-color: ${(p) => p.color};
  height: 1rem;
  width: 1.5rem;
`;
