import React, { useState } from "react";
import clsx from "clsx";
import {
  makeStyles,
  //   useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
// import List from '@material-ui/core/List';
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
// import ChevronRightIcon from "@material-ui/icons/ChevronRight";
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';

import { SketchPicker, ColorResult, ChromePicker } from "react-color";
import styled from "styled-components";
import { DraggableColorBox } from "./DraggableColorBox";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
// import { keys } from "./colorHelper";

const drawerWidth = "20%";
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
      display: "flex",
      flexDirection: "column",
      alignItems: "centre",
    },
    drawerPaper: {
      width: drawerWidth,
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

type Color = {
  name: string;
  color: ColorResult;
};

export const NewPaletteForm = () => {
  const classes = useStyles();
  //   const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [newColor, setNewColor] = React.useState({
    hex: "#7ed321",
    hsl: {
      h: 88.65168539325842,
      s: 0.7295081967213115,
      l: 0.4784313725490196,
      a: 1,
    },
    hsv: {
      h: 88.65168539325842,
      s: 0.8436018957345972,
      v: 0.8274509803921568,
      a: 1,
    },
    oldHue: 250,
    rgb: { r: 126, g: 211, b: 33, a: 1 },
    source: "hex",
  } as ColorResult);
  const [palette, setPalette] = useState([] as Color[]);
  const [colorName, setColorName] = useState("");

  React.useEffect(() => {
    ValidatorForm.addValidationRule("isColorNameUnique", value => {
      return palette.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      );
    });
    ValidatorForm.addValidationRule("isColorUnique", value => {
      return palette.every(
        ({ color }) =>
          color.hex.toLowerCase() !== newColor.hex.toLowerCase()
      );
    });
  });

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
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
        <SketchPickerStyled
          color={newColor.hex}
          onChangeComplete={(newColor) => setNewColor(newColor)}
        />
        <ChromePickerStyled
          color={newColor.hex}
          onChangeComplete={(newColor) => setNewColor(newColor)}
        />
        <ValidatorForm
          //   ref = {formRef}
          onSubmit={() => {
            setPalette([...palette, { name: colorName, color: newColor }]);
            setColorName("");
          }}
          onError={(errors) => console.log(errors)}
        >
          <TextValidator
            label="New Color"
            onChange={(e) => setColorName((e.target as HTMLInputElement).value)}
            name="color"
            value={colorName}
            validators={["required", "isColorUnique", "isColorNameUnique"]}
            errorMessages={["this field is required", "color is not unik", "color name is not unik"]}
          />
          <Button
            variant="contained"
            size="medium"
            style={{ backgroundColor: newColor.hex }}
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
        {palette.map((c) => (
          <DraggableColorBox color={c.color.hex} name={c.name} key={c.name + c.color.hex}  />
        ))}
      </main>
    </div>
  );
}; 

const SketchPickerStyled = styled(SketchPicker)`
  align-self: center;
  margin: 0.5rem;
`;
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
