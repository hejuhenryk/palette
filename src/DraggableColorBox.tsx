import React from 'react'
import styled from 'styled-components'

type Props = {
    color: string;
    name: string;
    handlerRemove: (id: string)=>void;
}

export const DraggableColorBox: React.FC<Props> = ({color, name}) => {
    return (
        <ColorBox color={color}>
            {name}
        </ColorBox>
    )
}

const ColorBox = styled.div<{color: string}>`
    background-color: ${p=>p.color};
    display: inline-flexbox;
    justify-content: center;
    height: 25%;
    width: 20%;
    margin: 0;
`