import { css, Global, SerializedStyles } from "@emotion/core";
import { ReactElement } from "react";
import styled from "@emotion/styled";

export const DARK_BLUE = "#05668D";
export const LIGHT_BLUE = "#028090";
export const DARK_GREEN = "#00a896";
export const LIGHT_GREEN = "#02c39a";
export const SEPIA = "#f0f3bd";
export const WHITE = "#ffffff";
export const OFF_WHITE = "#f9f9f9";
export const GRAY = "#ebebeb";
export const CHARCOAL = "#666";
export const LIGHT_CHARCOAL = "#999";
export const DARK_GRAY = "rgba(0, 0, 0, 0.1)";
export const TRANSPARENT = "rgba(0, 0, 0, 0)";
export const lightLinearGradient = css`
  background-image: linear-gradient(to bottom, ${TRANSPARENT}, ${DARK_GRAY});
`;

const globals: SerializedStyles = css`
  html {
    font-family: Sans-Serif, Helvetica, serif;
    ${lightLinearGradient};
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  body {
    margin: 0;
    padding: 0;
    min-height: 100%;
    color: ${DARK_BLUE};
    font-family: "Circular Spotify Text", "Helvetica Neue", Arial, Verdana,
      "sans-serif";
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
    font-size: 1rem;
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
    font-size: 1rem;
    font-family: "Circular Spotify Text", "Helvetica Neue", Arial, Verdana,
      "sans-serif";
    cursor: pointer;
    text-align: center;
    transition: background 250ms ease-in-out, transform 150ms ease;
    -webkit-appearance: none;
    -moz-appearance: none;
    border-radius: 0.5rem;
    color: ${OFF_WHITE};
    background-color: ${DARK_BLUE};
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
    &::placeholder {
      color: ${LIGHT_CHARCOAL};
    }
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
    max-width: 32.5rem;
    padding: 1rem;
    border: 1px solid ${DARK_BLUE};
    border-radius: 4px;
  }
  i {
    cursor: pointer;
  }
`;

export const globalStyles: ReactElement = <Global styles={globals} />;

export const CopyContainer = styled.div`
  padding: 0 2rem;
`;
export const ContentCard = styled.div`
  background: ${GRAY};
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  box-shadow: 0 2px 2px -2px rgba(0, 0, 0, 0.2);
`;

export const vibeColors = {
  danceability: `0, 168, 150`,
  energy: `0, 168, 150`,
  loudness: `0, 168, 150`,
  speechiness: `0, 168, 150`,
  acousticness: `0, 168, 150`,
  instrumentalness: `0, 168, 150`,
  liveness: `0, 168, 150`,
  valence: `0, 168, 150`,
};
export const Button = styled.button`
  font-family: "Circular Spotify Text", "Helvetica Neue", Verdana, sans-serif;
  display: flex;
  align-items: center;
  border-radius: 2rem;
  padding: 1rem 2rem;
  color: ${GRAY};
  &:hover {
    color: ${WHITE};
    svg,
    g,
    path {
      fill: ${WHITE};
    }
  }
  svg {
    margin-left: 0.5rem;
  }
`;
