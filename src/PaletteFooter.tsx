import React from "react";
import styled from "styled-components";
import { device } from "./media";

type Props = {
  paletteName: string;
  emoji: string;
};

export const PaletteFooter: React.FC<Props> = ({ paletteName, emoji }) => {
  return (
    <Footer>
      {paletteName}
      <span className="emoji">{emoji}</span>
    </Footer>
  );
};

const Footer = styled.footer`
  padding: 0 1rem;
  display: none;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 3rem;
  background-color: #cccccc;
  /* position: fixed */
  .emoji {
    size: 2rem;
    margin: 0 0.4rem;
  }
  @media ${device.mobileL} {
    display: flex;
  }
`;
