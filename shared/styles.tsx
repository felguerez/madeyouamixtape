import { css, SerializedStyles, Global } from "@emotion/core";
import { ReactElement } from "react";
import styled from "@emotion/styled";

const globals: SerializedStyles = css`
  html {
    font-family: Sans-Serif, Helvetica, serif;
  }
  body {
    margin: 0;
    padding: 0;
    min-height: 100%;
    background: rgba(19, 28, 31, 1);
    color: rgba(255, 183, 72, 1);
  }
  a {
    color: rgba(94, 215, 255, 1);
    font-weight: bold;
    &:visited {
      color: rgba(94, 215, 255, 1);
      //color: rgba(140, 92, 158, 1);
    }
    &:hover {
      color: rgba(172, 234, 110);
      //color: rgba(255, 183, 72, 1);
    }
  }
`;

export const globalStyles: ReactElement = <Global styles={globals} />;

export const Card = styled.div`
  width: 400px;
  min-height: 600px;
  max-height: 90vh;
  overflow-y: scroll;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 16px;
  margin: 16px;
`;
