import Layout from "../components/layout";
import { getSession } from "../lib/iron";
import * as models from "../lib/models";

const Swaps = ({ swaps }: { swaps: {}[] }) => {
  return (
    <Layout>
      <h1>Playlist Swaps</h1>
      <p>Share some music with people you know or random strangers.</p>
      {swaps.length ? (
        <div>swaps go here</div>
      ) : (
        <div>
          <p>You aren't participating in any swaps.</p>
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
    },
  };
}

export default Swaps;
