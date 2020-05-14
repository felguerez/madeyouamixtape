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
    font-family: "Circular Spotify Text";
  }
  p {
    color: #b0bec5;
  }
  a {
    font-weight: bold;
    text-decoration: none;
    color: rgba(94, 215, 255, 1);
    &:visited {
      color: rgba(94, 215, 255, 1);
    }
    &:hover {
      color: rgba(172, 234, 110);
    }
  }
  input {
    font-size: 12px;
    &:focus {
      outline: 0;
      box-shadow: 0 0 1px 3px rgba(255, 183, 72, 1);
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
    background-color: #2e3c43;
    border-radius: 0.5rem;
    color: #b0bec5;
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
    border: 1px solid #ccc;
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
    background: #2e3c43;
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
    border: 1px solid #2e3c43;
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
