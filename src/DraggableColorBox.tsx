import React from "react";
import styled from "styled-components";
import { IconButton } from "@material-ui/core";
import DelateIcon from "@material-ui/icons/Delete";
import { SortableElement } from "react-sortable-hoc";
import { device } from "./media";

type Props = {
  color: string;
  name: string;
  handlerRemove: (c: string) => void;
};

const DraggableColorBox = React.memo( SortableElement(
  ({ color, name, handlerRemove }: Props) => {
    console.log(color)
    return (
      <ColorBox color={color}>
        <span>
          <p>{name}</p>
          <IconButton edge="end" onClick={() => handlerRemove(color)}>
            <DelateIcon />
          </IconButton>
        </span>
      </ColorBox>
    );
  }
));

const ColorBox = styled.div<{ color: string }>`
  background-color: ${(p) => p.color};
  display: inline-flex;
  align-items: flex-end;
  height: 5%;
  width: 100%;
  overflow: hidden;
  margin: 0;
  span {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 5%;
    height: 100%;
    @media ${device.tablet} {
      height: 20%;
    }
    p {
      text-transform: uppercase;
    }
  }
  @media ${device.tablet} {
    height: 25%;
    width: 20%;
  }
`;

export { DraggableColorBox };
