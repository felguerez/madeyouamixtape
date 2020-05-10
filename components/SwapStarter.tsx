/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

export const SwapStarter = ({ children, spotify_id }) => {
  return (
    <form
      method="post"
      action="/api/swaps"
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
};

const ButtonLink = styled.button`
  background: none;
  border: none;
  color: rgba(94, 215, 255, 1);
  &:visited {
    color: rgba(94, 215, 255, 1);
  }
  &:hover {
    color: rgba(172, 234, 110);
  }
  cursor: pointer;
  font-weight: bold;
  font-size: 1em;
`;
