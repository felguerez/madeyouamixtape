/** @jsx jsx */
import Layout from "../components/layout";
import { css, jsx } from "@emotion/core";
import * as db from "../lib/db";
import escape from "sql-template-strings";

const Home = ({ swaps }) => {
  console.log("swaps:", swaps);
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

export async function getServerSideProps({ req }) {
  const [swaps] = await db.query(escape`
        SELECT *
        FROM swap
      `);

  return {
    props: {
      swaps: JSON.stringify(swaps),
    },
  };
}
export default Home;
