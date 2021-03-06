import React, { useContext } from "react";
import styled from "styled-components";
import { MiniPalette } from "./MiniPalette";
import { Link } from "react-router-dom";
import { device } from "./media";
import Icon from "@material-ui/core/Icon";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { ConfirmRemoveDialog } from "./ConfirmRemoveDialog";
import { PaletteContext } from "./context/paletteContext";


export const PalettesList: React.FC/* <PalettesListPropsT> */ = React.memo( (props) => {
  const { palettes, removePalette } = useContext(PaletteContext);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [paletteToRemove, setPaletteToRemove] = React.useState("");
  const handleRemovePalette = React.useCallback((id: string) => {
    setPaletteToRemove(id);
    setIsDialogOpen(true);
  }, [])
  const handleShouldDelet = (should: boolean) => {
    if (should) {
      removePalette(paletteToRemove);
      setIsDialogOpen(false);
      setPaletteToRemove("");
    } else {
      setIsDialogOpen(false);
      setPaletteToRemove("");
    }
  }
  return (
    <>
    <ListPage>
      <div className="container">
        <div className="nav">
          <h3 className="title">Palletes</h3>
          <Link to="/new">
            <Icon style={{ fontSize: "2rem" }}>add_circle</Icon>
          </Link>
        </div>
        <TransitionGroup className="palettes">
          {palettes.map((p) => (
            <CSSTransition key={p.id} timeout={500}>
              <MiniPalette palette={p} removePalette={handleRemovePalette} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    </ListPage>
    <ConfirmRemoveDialog isOpen={isDialogOpen} paletteName={paletteToRemove} shouldDelet={handleShouldDelet}/>
    </>
  );
});

const ListPage = styled.div`
  /* background-color: #7c95d2; */
  .exit {
    opacity: 1;
    transition: opacity 200ms;
  }
  .exit-active {
    opacity: 0;
    /* transition: opacity 800ms; */
  }
  display: flex;
  height: 100%;
  align-items: flex-start;
  justify-content: center;
  overflow: auto;
  .title {
    font-size: 2rem;
    font-weight: 900;
  }

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
    align-items: center;
    a {
      color: white;
      text-decoration: none;
      display: flex;
      font-size: 2rem;
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
