import React from "react";
import styled from "styled-components";
import { PaletteT } from "./index.d";
import { MiniPalette } from "./MiniPalette";
import { Link } from "react-router-dom";
import { device } from "./media";

type PalettesListPropsT = {
  palettes: PaletteT[];
  removePalette: (id: string) => void;
};

export const PalettesList: React.FC<PalettesListPropsT> = (props) => {
  const { palettes, removePalette } = props;
  return (
    <ListPage>
      <div className="container">
        <div className="nav">
          <h3>Palletes</h3>
          <Link to="/new">create new palette</Link>
        </div>
        <div className="palettes">
          {palettes.map((p) => (
            <MiniPalette palette={p} key={p.id} removePalette={removePalette} />
          ))}
        </div>
      </div>
    </ListPage>
  );
};

const ListPage = styled.div`
  /* background-color: #7c95d2; */
  display: flex;
  height: 100%;
  align-items: flex-start;
  justify-content: center;
  overflow: auto;
  .container {
    width: 90%;
    display: flex;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
    padding: 2rem;
    /* height: 100%; */
    box-sizing: border-box;
    @media ${device.mobileL} {
      width: 80%;
    }
    @media ${device.tablet} {
      width: 75%;
    }
    @media ${device.laptop} {
      width: 65%;
    }
  }
  .nav {
    display: flex;
    width: 100%;
    justify-content: space-between;
    color: white;
    font-weight: 700;
    padding: 0 1rem;
    a {
      color: white;
      text-decoration: none;
    }
  }
  .palettes {
    width: 100%;
    box-sizing: border-box;
    display: grid;
    /* height: 80%; */
    grid-template-columns: repeat(1, 100%);
    grid-gap: 1rem 0;
    padding: 1rem;
    @media ${device.tablet} {
      grid-gap: 1rem 10%;
      grid-template-columns: repeat(2, 45%);
    }
    @media ${device.laptop} {
      grid-gap: 1rem 5%;

      grid-template-columns: repeat(3, 30%);
    }
  }
`;
