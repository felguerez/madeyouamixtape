/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useUser } from "../lib/hooks";
import { SwapStarter } from "../components/SwapStarter";

const Home = () => {
  const user = useUser();
  return (
    <>
      <h1
        css={css`
          display: flex;
          justify-content: space-between;
        `}
      >
        <span>Made You A Mixtape</span>
      </h1>
      <p>Share some music with people you know or random strangers.</p>
      <p>Make it a party and invite your friends with great taste. </p>
      {user && (
        <SwapStarter spotify_id={user.spotify_id}>Start one now.</SwapStarter>
      )}
    </>
  );
};

export default Home;
