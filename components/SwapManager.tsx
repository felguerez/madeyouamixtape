/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import {
  DARK_BLUE,
  DARK_GREEN,
  LIGHT_BLUE,
  LIGHT_GREEN,
} from "../shared/styles";

export const SwapManager = ({
  children,
  spotify_id,
  user_id,
  action,
  id,
}: {
  children: React.ReactNode;
  spotify_id: string;
  action?: "join" | "create";
  user_id: number;
  id?: number;
}) => {
  switch (action) {
    case "join":
      return (
        <form
          method="post"
          action={`/api/swaps/${id}/join`}
          css={css`
            display: inline;
          `}
        >
          <input type="hidden" name="spotify_id" value={spotify_id} />
          <ButtonLink type="submit" name="submit" value="true">
            {children}
          </ButtonLink>
        </form>
      );
    default: {
      return (
        <form
          method="post"
          action={`/api/users/${user_id}/swaps`}
          css={css`
            display: inline;
          `}
        >
          <input type="hidden" name="spotify_id" value={spotify_id} />
          <ButtonLink type="submit" name="submit" value="true">
            {children}
          </ButtonLink>
        </form>
      );
    }
  }
};

export const ButtonLink = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  text-align: left;
  color: ${DARK_GREEN};
  &:visited {
    color: ${DARK_GREEN};
  }
  &:hover {
    color: ${LIGHT_GREEN};
  }
  cursor: pointer;
  font-weight: bold;
  font-size: 1em;
`;
