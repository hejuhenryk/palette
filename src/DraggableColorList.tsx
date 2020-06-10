import React from "react";
import { DraggableColorBox } from "./DraggableColorBox";
import { SortableContainer } from 'react-sortable-hoc';

import { ColorT } from "./index.d";
import styled from "styled-components";

type Props = {
  colors: ColorT[];
  handleRemove: (c: string) => void;
};
const DraggableColorList = SortableContainer(({colors, handleRemove}: Props) => {
  console.log("reList")
  const hr = React.useCallback((c: string)=>{handleRemove(c)},[handleRemove])
    return (
      <ListContainer>
        {colors.map((c, i) => (
          <DraggableColorBox
            index={i}
            color={c.color}
            name={c.name}
            key={c.name + c.color}
            handlerRemove={hr}
          />
        ))}
      </ListContainer>

    );
  });

  const ListContainer = styled.div`
    height: 100%;
  `

export {DraggableColorList}