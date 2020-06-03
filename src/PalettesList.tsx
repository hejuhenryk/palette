import React from "react";
import styled from "styled-components";
import { PaletteT } from "./index.d";
import { MiniPalette } from "./MiniPalette";
import { Link } from "react-router-dom";

type PalettesListPropsT = {
  palettes: PaletteT[];
};

export const PalettesList: React.FC<PalettesListPropsT> = (props) => {
  const { palettes } = props;
  return (
    <ListPage>
      <div className="container">
        <div className="nav">
          <h3>Palletes</h3>
          <Link to="/new">create new palette</Link>
        </div>
        <div className="palettes">
          {palettes.map((p) => (
            <MiniPalette palette={p} key={p.id} />
          ))}
        </div>
      </div>
    </ListPage>
  );
};

const ListPage = styled.div`
  background-color: #7c95d2;
  display: flex;
  height: 100vh;
  align-items: flex-start;
  justify-content: center;
  .container {
    width: 50%;
    display: flex;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
    padding: 2rem;
    box-sizing: border-box;
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
    grid-template-columns: repeat(3, 30%);
    grid-gap: 5%;
    padding: 1rem;
  }
`;
