import { css, SerializedStyles, Global } from "@emotion/core";
import { ReactElement } from "react";
import styled from "@emotion/styled";

export const DARK_BLUE = "#05668D";
export const LIGHT_BLUE = "#028090";
export const DARK_GREEN = "#00a896";
export const LIGHT_GREEN = "#02c39a";
export const SEPIA = "#f0f3bd";
export const WHITE = "#ffffff";
export const GRAY = "#f9f9f9";
export const DARK_GRAY = "#ebebeb";
export const lightLinearGradient = css`
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.1)
  );
`;

const globals: SerializedStyles = css`
  html {
    font-family: Sans-Serif, Helvetica, serif;
    background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.1)
    );
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  body {
    margin: 0;
    padding: 0;
    min-height: 100%;
    color: ${DARK_BLUE};
    font-family: "Circular Spotify Text";
  }
  a {
    font-weight: bold;
    text-decoration: none;
    color: ${DARK_GREEN};
    &:visited {
      color: ${DARK_GREEN};
    }
    &:hover {
      color: ${LIGHT_GREEN};
    }
  }
  input {
    font-size: 12px;
    &:focus {
      outline: 0;
      box-shadow: 0 0 0 3px ${DARK_BLUE};
    }
  }
  button {
    display: inline-block;
    border: none;
    padding: 1rem;
    margin: 0;
    text-decoration: none;
    font-family: sans-serif;
    font-size: 1rem;
    cursor: pointer;
    text-align: center;
    transition: background 250ms ease-in-out, transform 150ms ease;
    -webkit-appearance: none;
    -moz-appearance: none;
    border-radius: 0.5rem;
    color: ${WHITE};
  }

  button:focus {
    outline: none;
  }

  button:active {
    transform: scale(0.99);
  }

  form,
  label {
    display: flex;
    flex-flow: column;
  }
  label > span {
    font-weight: 600;
  }
  input {
    padding: 8px;
    margin: 0.3rem 0 1rem;
    border: 1px solid ${GRAY};
    border-radius: 4px;
  }
  .submit {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .submit > a {
    text-decoration: none;
  }
  .submit > button {
    padding: 0.5rem 1rem;
    cursor: pointer;
    background: ${DARK_BLUE};
    border-radius: 4px;
  }
  .submit > button:hover {
    border-color: #888;
  }
  .error {
    color: brown;
    margin: 1rem 0 0;
  }
  form {
    max-width: 21rem;
    padding: 1rem;
    border: 1px solid ${DARK_BLUE};
    border-radius: 4px;
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
