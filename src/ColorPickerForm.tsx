import React, { useState } from "react";
import Button from "@material-ui/core/Button";

import { ColorResult, ChromePicker } from "react-color";
import styled from "styled-components";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { ColorT } from "./index.d";

type Props = {
  addNewColor: (c: ColorT) => void;
  isPaletteFull: boolean;
  buttonColor: "inherit" | "primary" | "secondary" | "default" | undefined;
  palette: ColorT[];
};

const initailColor: ColorT = {
  name: "initialGreen",
  color: "#7ed321",
};

export const ColorPickerForm: React.FC<Props> = ({
  addNewColor,
  isPaletteFull,
  buttonColor,
  palette,
}) => {
  const [newColor, setNewColor] = useState(initailColor.color);
  const [newColorName, setNewColorName] = useState("");

  React.useEffect(() => {
    ValidatorForm.addValidationRule("isColorNameUnique", (value) => {
      return palette.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      );
    });
    ValidatorForm.addValidationRule("isColorUnique", (value) => {
      return palette.every(
        ({ color }) => color.toLowerCase() !== newColor.toLowerCase()
      );
    });
  });

  const handleSubmit = () => {
    addNewColor({ color: newColor, name: newColorName });
    setNewColorName("");
  };
  return (
    <DrowerContainer>
      <ValidatorForm
        onSubmit={handleSubmit}
        onError={(errors) => console.log(errors)}
        className="color_form"
      >
        <ChromePickerStyled
          color={newColor}
          onChangeComplete={(pickedColor: ColorResult) =>
            setNewColor(pickedColor.hex)
          }
          disableAlpha={true}
        />
        <TextValidator
          label="Color Name"
          placeholder="Color Name"
          onChange={(e) =>
            setNewColorName((e.target as HTMLInputElement).value)
          }
          name="color"
          value={newColorName}
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
          style={{
            backgroundColor: isPaletteFull ? "lightGrey" : newColor,
            marginTop: ".5rem",
          }}
          type="submit"
          disabled={isPaletteFull}
          color={buttonColor}
        >
          ADD
        </Button>
      </ValidatorForm>
    </DrowerContainer>
  );
};

const ChromePickerStyled = styled(ChromePicker)`
  align-self: center;
  margin: 1.5rem;
  width: 100% !important;
`;

const DrowerContainer = styled.div`
  padding: 0 0.3rem;
  .color_form {
    display: flex;
    flex-direction: column;
  }
`;
