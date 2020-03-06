import React from 'react'
import styled from 'styled-components'
import {ColorT} from './index.d'

type ColorBoxPropsT = {
    color: ColorT
}

export const ColorBox: React.FC<ColorBoxPropsT> = (props) => {
    const {color, name} = props.color
    return (
        <ColorBoxStyled backgroud={color} >
            <CopyContainer>
                {/* <div> */}
                    <span>{name}</span>
                {/* </div> */}
                <button>copy</button>
            </CopyContainer>
            <span>more</span>
        </ColorBoxStyled>
    )
}

const CopyContainer = styled.div`
        display: flex;
        flex-flow: column-reverse;
    /* & > div { */
    /* } */
    button {
        text-transform: uppercase;
        width: 5rem;
        height: 1.5rem;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        outline: none;
        background-color: rgba(255, 255, 255, 0.3);
        border: none;
        font-size: .7rem;
        color: white;
        line-height: 1.5rem;
        letter-spacing: .08rem;
        opacity: 0;
        cursor: grab;
    }
    span {
        text-transform: uppercase;
        font-size: 0.8rem;
        padding: 0 .2rem;
    }
`

const ColorBoxStyled = styled.div<{backgroud: string}>`
    position: relative;
    display: flex;
    justify-content: space-between;
    background-color: ${p=>p.backgroud};
    width: 20%;
    height: 25%;
    cursor: pointer;
    & > span {
        text-transform: uppercase;
        font-size: 0.8rem;
        padding: 0 .2rem;
        color: white;
        align-self: flex-end;
        background-color: rgba(255, 255, 255, 0.3)
    }
    &:hover button {
        opacity: 1;
        transition: opacity .5s linear;
    }
`