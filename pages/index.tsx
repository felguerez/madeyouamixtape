/** @jsx jsx */
import Layout from "../components/layout";
import { css, jsx } from "@emotion/core";

const Home = () => {
  return (
    <Layout>
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
    </Layout>
  );
};

export default Home;
