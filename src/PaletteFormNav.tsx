import React from "react";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import { drawerWidth, appBarHeight } from "./PaletteForm";
import { useHistory } from "react-router-dom";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import styled from "styled-components";
import { SubmitFormDialog } from "./SubmitFormDialog";
import { device } from "./media";

type Props = {
  paletteNames: string[];
  addPalette: (name: string, emiji?: string) => void;
  open: boolean;
  handleDrawerOpen: () => void;
  saveMode?: {
    emoji: string,
    name: string
  }
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  })
);

export const PaletteFormNav: React.FC<Props> = ({
  paletteNames,
  addPalette,
  open,
  handleDrawerOpen,
  saveMode
}) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="default"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <ToolbarStyled>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <ChevronRightIcon />
          </IconButton>
          <Typography variant="h6" noWrap className="title" >
            Palette - Create your own one!
          </Typography>
          <Buttons>
            <SubmitFormDialog
              addPalette={addPalette}
              paletteNames={paletteNames}
              saveMode={saveMode}
            />
            <Button
              onClick={() => history.push("/")}
              variant="contained"
              color="secondary"
            >
              go back
            </Button>
          </Buttons>
        </ToolbarStyled>
      </AppBar>
    </>
  );
};

const ToolbarStyled = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  .title {
    display: none;
    @media ${device.tablet} {
    display: inline-block;

  }
  }
  
`;

const Buttons = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  button {
    margin-left: .3rem;
    min-width: 110px;
  }
`;
