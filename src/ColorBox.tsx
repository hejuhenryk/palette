import React, { useState } from "react";
import styled from "styled-components";
import { ColorT } from "./index.d";
import CopyToClipboard from "react-copy-to-clipboard";
import { Link } from "react-router-dom";

type ColorBoxPropsT = {
  color: ColorT;
  paletteId: string;
  id: string;
  hiddeLink?: true;
  height?: string;
};

export const ColorBox: React.FC<ColorBoxPropsT> = (props) => {
  const { color, name } = props.color;
  const [isCopied, setIsCopied] = useState(false);
  const copyHandler = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };
  return (
    <ColorBoxStyled backgroud={color} height={props.height || "25%"} >
      <div className={`overlay-copy${isCopied ? " show" : ""}`} />
      <div className={`copy-msg${isCopied ? " show" : ""}`}>
        <h1>copied</h1>
        <p>{color}</p>
      </div>
      <CopyContainer>
        <span>{name}</span>
        <CopyToClipboard text={color} onCopy={copyHandler}>
          <button>copy</button>
        </CopyToClipboard>
      </CopyContainer>
      {!props.hiddeLink && (
        <Link
          to={`/palette/${props.paletteId}/${props.id}`}
          className="moreLink"
        >
          <span>more</span>
        </Link>
      )}
    </ColorBoxStyled>
  );
};

const CopyContainer = styled.div`
  display: flex;
  flex-flow: column-reverse;

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
    font-size: 0.7rem;
    color: white;
    line-height: 1.5rem;
    letter-spacing: 0.08rem;
    opacity: 0;
    text-align: center;
    cursor: grab;
  }
  span {
    text-transform: uppercase;
    font-size: 0.8rem;
    padding: 0 0.2rem;
  }
`;

const ColorBoxStyled = styled.div<{ backgroud: string, height: string }>`
  position: relative;
  display: flex;
  justify-content: space-between;
  background-color: ${(p) => p.backgroud};
  width: 20%;
  height: ${p=>p.height};
  /* cursor: pointer; */
  .overlay-copy {
    position: absolute;
    opacity: 0;
    background-color: ${(p) => p.backgroud};
    height: 100%;
    width: 100%;
    z-index: 0;
    transition: transform 0.5s ease-in-out;
  }
  .overlay-copy.show {
    z-index: 10;
    transform: scale(15);
    opacity: 1;
    /* overflow: hidden; */
  }
  .copy-msg {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    text-transform: uppercase;
    color: white;
    opacity: 0;
    z-index: -1;
    transform: scale(0.01);
    transition: transform 0.5s ease-in 0.2s;
    h1 {
      background-color: rgba(255, 255, 255, 0.2);
      font-size: 4rem;
      width: 100%;
      text-align: center;
      text-shadow: 1px 1px #777777;
    }
    p {
      font-size: 2rem;
      font-weight: lighter;
    }
  }
  .copy-msg.show {
    opacity: 1;
    z-index: 100;
    transform: scale(1);
  }
  .moreLink {
    z-index: 2;
    text-transform: uppercase;
    font-size: 0.8rem;
    padding: 0 0.2rem;
    color: white;
    align-self: flex-end;
    background-color: rgba(255, 255, 255, 0.3);
    text-decoration: none;
  }
  &:hover button {
    opacity: 1;
    transition: opacity 0.5s linear;
  }
`;
