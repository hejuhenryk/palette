import React from "react";
import styled from "styled-components";
import { device } from "./media";
import { Button } from "@material-ui/core";

type Props = {
  paletteName: string;
  emoji: string;
  handleEdit?: ()=>void;
};

export const PaletteFooter: React.FC<Props> = ({ paletteName, emoji, handleEdit }) => {
  return (
    <Footer>
      {handleEdit && <Button onClick={handleEdit}>edit palette</Button>}
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
  @media ${device.mobileL} {
    display: flex;
  }
  .emoji {
    size: 2rem;
    margin: 0 0.4rem;
  }
`;
