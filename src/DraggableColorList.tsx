import React from "react";
import { DraggableColorBox } from "./DraggableColorBox";
import { arrayMove, SortableContainer } from 'react-sortable-hoc';

import { ColorT } from "./index.d";
import styled from "styled-components";

type Props = {
  colors: ColorT[];
  handleRemove: (c: string) => void;
};
const DraggableColorList = SortableContainer((props: Props) => {
    return (
      <ListContainer>
        {props.colors.map((c, i) => (
          <DraggableColorBox
            index={i}
            color={c.color}
            name={c.name}
            key={c.name + c.color}
            handlerRemove={props.handleRemove}
          />
        ))}
      </ListContainer>

    );
  });

  const ListContainer = styled.div`
    height: 100%;
  `

export {DraggableColorList}