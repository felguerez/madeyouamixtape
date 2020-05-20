/** @jsx jsx */
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { DARK_BLUE, vibeColors, WHITE } from "../shared/styles";
import { css, jsx } from "@emotion/core";
import { SecretlyButton } from "./SwapManager";
import { useFeatures } from "../lib/hooks";

const Vibes = ({ features }) => {
  if (!features) return null;
  return (
    <VibesContainer>
      {Object.keys(features).map((vibe) => {
        return (
          <Vibe opacity={features[vibe]} rgb={vibeColors[vibe]}>
            <span>{vibe}</span>
          </Vibe>
        );
      })}
    </VibesContainer>
  );
};

const VibesContainer = styled.div`
  display: flex;
`;

const Vibe = styled.div<{ opacity: number; rgb: string }>`
  background: ${({ opacity, rgb }) => `rgba(${rgb}, ${opacity})`};
  display: inline-block;
  padding: 0.5rem;
  color: ${({ opacity }) => (opacity > 0.5 ? WHITE : DARK_BLUE)};
  border-radius: 0.5rem;
  border: ${({ rgb }) => `1px solid rgba(${rgb}, 1)`};
  margin-right: 0.5rem;
  font-size: 0.75rem;
  &:last-of-type {
    margin-right: 0;
  }
`;
export default Vibes;
