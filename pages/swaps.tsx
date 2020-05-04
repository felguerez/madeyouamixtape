/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Layout from "../components/layout";
import { getSession } from "../lib/iron";
import * as models from "../lib/models";
import styled from "@emotion/styled";
import useSWR from "swr";
import { useSwaps } from "../lib/hooks";

const Swaps = ({ spotify_id }: { spotify_id: string }) => {
  const swaps = useSwaps() || [];

  return (
    <Layout>
      <h1>Playlist Swaps</h1>
      <p>Share some music with people you know or random strangers.</p>
      {swaps.length ? (
        <div>swaps go here</div>
      ) : (
        <div>
          <p>
            You aren't participating in any swaps.{" "}
            <SwapStarter spotify_id={spotify_id}>Start one now.</SwapStarter>
          </p>
        </div>
      )}
    </Layout>
  );
};

export async function getServerSideProps({ req }) {
  const session = await getSession(req);
  const spotifyUser = await models.spotifyUser.getBySpotifyId(
    session.spotify_id
  );
  return {
    props: {
      swaps: [],
      spotify_id: spotifyUser.spotify_id,
    },
  };
}

const SwapStarter = ({ children, spotify_id }) => {
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

export default Swaps;
