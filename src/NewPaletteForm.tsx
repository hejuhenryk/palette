import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import { ColorResult, ChromePicker } from "react-color";
import styled from "styled-components";
import { DraggableColorBox } from "./DraggableColorBox";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { ColorT, PaletteT } from "./index.d";
import { useHistory } from "react-router-dom";
import { DraggableColorList } from "./DraggableColorList";
import { arrayMove } from "react-sortable-hoc";

const drawerWidth = "50%";
const appBarHeight = "64px";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      height: appBarHeight,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth})`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
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
      padding: theme.spacing(3),
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

const initailColor: ColorT = {
  name: "initialGreen",
  color: "#7ed321",
};

type Props = {
  paletteNames: string[];
  addPalette: (p: PaletteT) => void;
};

export const NewPaletteForm: React.FC<Props> = ({
  paletteNames,
  addPalette,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(true);
  const [newColor, setNewColor] = useState(initailColor.color);
  const [colorName, setColorName] = useState("");

  const [palette, setPalette] = useState([{name: "red", color: "blue"}] as ColorT[]);
  const [paletteName, setPaletteName] = useState("");

  React.useEffect(() => {
    ValidatorForm.addValidationRule("isColorNameUnique", (value) => {
      return palette.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      );
    });
    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) => {
      return paletteNames.every(
        (name) => name.toLowerCase() !== value.toLowerCase()
      );
    });
    ValidatorForm.addValidationRule("isColorUnique", (value) => {
      return palette.every(
        ({ color }) => color.toLowerCase() !== newColor.toLowerCase()
      );
    });
  });

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleRemove = (color: string) => {
    setPalette((palette) => palette.filter((c) => c.color !== color));
  };
  const handleAddPalette = () => {
    const newPalette: PaletteT = {
      paletteName: paletteName,
      id: paletteName.toLowerCase().replace(/ /g, "-"),
      emoji: ":fire",
      colors: palette,
    };
    addPalette(newPalette);
    history.push("/");
  };
  const onSortEnd = ({oldIndex, newIndex}: {oldIndex: number, newIndex: number}) => {
    setPalette(
       arrayMove(palette, oldIndex, newIndex)
    );
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="default"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Palette - Create your own one!
          </Typography>



          <ValidatorForm onSubmit={(e)=>handleAddPalette()} onError={(errors) => console.log(errors)} style={{display: "flex", flexDirection: "row"}}>
            <TextValidator
              label="New Palette"
              onChange={(e) =>
                setPaletteName((e.target as HTMLInputElement).value)
              }
              name="palette"
              value={paletteName}
              validators={["required", "isPaletteNameUnique"]}
              errorMessages={[
                "this field is required",
                "palette name is not unik",
              ]}
            />
            <Button type="submit" variant="contained" >Save Palette</Button>
          </ValidatorForm>



        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
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
        <span>
          <Button variant="contained" color="primary" size="medium">
            ADD
          </Button>
          <Button variant="contained" color="primary" size="medium">
            ADD
          </Button>
        </span>

        <ValidatorForm
          //   ref = {formRef}
          onSubmit={() => {
            setPalette([...palette, { name: colorName, color: newColor }]);
            setColorName("");
          }}
          onError={(errors) => console.log(errors)}
        >
          <ChromePickerStyled
            color={newColor}
            onChangeComplete={(pickedColor: ColorResult) =>
              setNewColor(pickedColor.hex)
            }
            disableAlpha={true}
          />
          <TextValidator
            label="New Color"
            onChange={(e) => setColorName((e.target as HTMLInputElement).value)}
            name="color"
            value={colorName}
            validators={["required", "isColorUnique", "isColorNameUnique"]}
            errorMessages={[
              "this field is required",
              "color is not unik",
              "color name is not unik",
            ]}
          />
          <Button
            variant="contained"
            size="medium"
            style={{ backgroundColor: newColor }}
            type="submit"
          >
            ADD
          </Button>
        </ValidatorForm>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <DraggableColorList colors={palette} handleRemove={handleRemove} axis="xy" onSortEnd={onSortEnd} />

      </main>
    </div>
  );
};

const ChromePickerStyled = styled(ChromePicker)`
  align-self: center;
  margin: 0.5rem;
`;

// const MainStyled = styled.main`
//     display: flex;
//     /* height: 100vh; */
//     flex-wrap: wrap;
//     flex-direction: row;
// `;
