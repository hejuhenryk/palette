import React from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

type Props = {
  addPalette: (name: string) => void;
  paletteNames: string[];
};

export const SubmitFormDialog: React.FC<Props> = ({
  addPalette,
  paletteNames,
}) => {
  const [open, setOpen] = React.useState(false);
  const [paletteName, setPaletteName] = React.useState("");

  React.useEffect(() => {
    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) => {
      return paletteNames.every(
        (name) => name.toLowerCase() !== value.toLowerCase()
      );
    });
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPaletteName("");
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Save Palette
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Save your palette</DialogTitle>
        <DialogContent>
          {/* <DialogContentText> */}
          <ValidatorForm
            onSubmit={() => addPalette(paletteName)}
            onError={(errors) => console.log(errors)}
            style={{ display: "flex", flexDirection: "column" }}
          >
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
            {/* <Button type="submit" variant="contained" color="primary">
              Save Palette
            </Button> */}
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleClose} type="submit" color="primary" variant="contained">
            Save Palette{" "}
          </Button>
        </DialogActions>
          </ValidatorForm>
        </DialogContent>
      </Dialog>
    </div>
  );
};
