import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { PaletteFormNav } from "./PaletteFormNav";
import { ColorT, PaletteT } from "./index.d";
import { useHistory } from "react-router-dom";
import { DraggableColorList } from "./DraggableColorList";
import arrayMove from "array-move";
import { initialPalettes } from "./seedPalettes";
import { ColorPickerForm } from "./ColorPickerForm";
import styled from "styled-components";

export const drawerWidth = "15rem";
export const appBarHeight = "64px";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },

    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      transition: theme.transitions.create(["width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    minDrower: {
      width: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      display: "flex",
      flexDirection: "column",
      alignItems: "centre",
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    },
    content: {
      flexGrow: 1,
      height: `calc(100vh - ${appBarHeight})`,
      // padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  })
);

type Props = {
  paletteNames: string[];
  addPalette: (p: PaletteT) => void;
};

export const NewPaletteForm: React.FC<Props> = React.memo((props) => {
  const { paletteNames, addPalette } = props;
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(true);

  const [palette, setPalette] = useState(initialPalettes[0].colors);

  const isPaletteFull = palette.length >= 20;
  const buttonColor = isPaletteFull ? "default" : "primary";

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleRemove = React.useCallback((color: string) => {
    setPalette((palette) => palette.filter((c) => c.color !== color));
  },[]);
  const handleAddPalette = (name: string, emoji?: string) => {
    const newPalette: PaletteT = {
      paletteName: name,
      id: name.toLowerCase().replace(/ /g, "-"),
      emoji: emoji ? emoji : "<3",
      colors: palette,
    };
    addPalette(newPalette);
    history.push("/");
  };
  const handleClearPalette = () => {
    setPalette([]);
  };
  const handleAddNewColor = (c: ColorT) => {
    setPalette([...palette, { name: c.name, color: c.color }]);
  };
  const addRandomColor = (): void => {
    const paletteNum = Math.floor(Math.random() * (initialPalettes.length - 1));
    const colorNum = Math.floor(
      Math.random() * (initialPalettes[paletteNum].colors.length - 1)
    );
    const color = initialPalettes[paletteNum].colors[colorNum];
    const newColor = palette.every(
      (c) => c.color !== color.color && c.name !== color.name
    )
      ? color
      : addRandomColor();
    if (newColor) handleAddNewColor(newColor);
  };
  const onSortEnd = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    setPalette(arrayMove(palette, oldIndex, newIndex));
  };
  return (
    <div className={classes.root}>
      <PaletteFormNav
        paletteNames={paletteNames}
        addPalette={handleAddPalette}
        open={open}
        handleDrawerOpen={handleDrawerOpen}
      />
      <Drawer
        className={open ? classes.drawer : classes.minDrower}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <DrawerContainer>
          <span className="btn-container">
            <Button
              onClick={handleClearPalette}
              variant="contained"
              color="secondary"
              size="medium"
            >
              clear palette
            </Button>
            <Button
              onClick={addRandomColor}
              disabled={isPaletteFull}
              variant="contained"
              color={buttonColor}
              size="medium"
            >
              random color
            </Button>
          </span>
          <ColorPickerForm
            addNewColor={handleAddNewColor}
            isPaletteFull={isPaletteFull}
            buttonColor={buttonColor}
            palette={palette}
          />
        </DrawerContainer>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <DraggableColorList
          colors={palette}
          handleRemove={handleRemove}
          axis="xy"
          onSortEnd={onSortEnd}
          distance={10}
        />
      </main>
    </div>
  );
});

const DrawerContainer = styled.div`
  padding: 0.2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .btn-container {
    display: flex;
    justify-content: space-between;
    button {
      width: 100%;
      margin: 2px;
    }
  }
`;

// const MainStyled = styled.main`
//     display: flex;
//     /* height: 100vh; */
//     flex-wrap: wrap;
//     flex-direction: row;
// `;
