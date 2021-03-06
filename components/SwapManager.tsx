/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import {
  DARK_BLUE,
  DARK_GREEN,
  LIGHT_BLUE,
  LIGHT_GREEN,
  WHITE,
} from "../shared/styles";
import { ChangeEvent, FormEvent } from "react";

export const SwapManager = ({
  children,
  spotify_id,
  user_id,
  action,
  id,
}: {
  children: React.ReactNode;
  spotify_id?: string;
  action?: "join" | "create";
  user_id?: number;
  id?: number;
}) => {
  switch (action) {
    case "join":
      return (
        <FormButton method="post" action={`/api/swaps/${id}/join`}>
          <SecretlyButton type="submit" name="submit" value="true">
            {children}
          </SecretlyButton>
        </FormButton>
      );
    default: {
      return (
        <FormButton method="post" action={`/api/users/${user_id}/swaps`}>
          <input type="hidden" name="spotify_id" value={spotify_id} />
          <SecretlyButton type="submit" name="submit" value="true">
            {children}
          </SecretlyButton>
          <style jsx>{`
            form {
              border: 0;
              padding: 0;
            }
            form.formBtn {
              padding: 0;
            }
          `}</style>
        </FormButton>
      );
    }
  }
};

export const SecretlyButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  text-align: left;
  cursor: pointer;
  font-weight: bold;
  font-size: 1em;
  color: ${DARK_GREEN};
  border: 0;
`;

const FormButton = styled.form`
  padding: 0;
  display: inline;
  border: 0;
`;
