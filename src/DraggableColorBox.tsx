import React from 'react'
import styled from 'styled-components'
import { IconButton } from '@material-ui/core'
import DelateIcon from '@material-ui/icons/Delete'

type Props = {
    color: string;
    name: string;
    handlerRemove: (id: string)=>void;
}

export const DraggableColorBox: React.FC<Props> = ({color, name, handlerRemove}) => {
    return (
        <ColorBox color={color}>
            <span>
                <p>{name}</p>
                <IconButton edge="end" onClick={()=>handlerRemove(color)} ><DelateIcon /></IconButton>
            </span>
        </ColorBox>
    )
}

const ColorBox = styled.div<{color: string}>`
    background-color: ${p=>p.color};
    display: inline-flex;
    align-items: flex-end;
    height: 25%;
    width: 20%;
    overflow: hidden;
    margin: 0;
    span {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 0 5%;
        p {
            text-transform: uppercase;
        };
    };
`