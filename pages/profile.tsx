import { useUser } from "../lib/hooks";
import fetch from "isomorphic-fetch";
import Layout from "../components/layout";
import * as models from "../lib/models";
import { SpotifyUser } from "../lib/models/spotifyUser";
import { getSession } from "../lib/iron";
import styled from "@emotion/styled";
import { BASE_URL, SPOTIFY_API_BASE } from "../lib/constants";

const Profile = ({
  spotifyUser,
  playlists,
}: {
  spotifyUser: SpotifyUser;
  playlists: { href: string; items: object[] };
}) => {
  const user = useUser({ redirectTo: "/" });
  return (
    <Layout>
      <h1>Playlists</h1>
      {spotifyUser && (
        <div>
          <h4>by {spotifyUser.display_name}</h4>
          {playlists.items && <p>{playlists.items.length} playlists</p>}
        </div>
      )}
    </Layout>
  );
};

export async function getServerSideProps({ req }) {
  // TODO: how can baseUrl be set by environment variable?
  const baseUrl = "http://localhost:3000";
  const session = await getSession(req);
  const spotifyUser = await models.spotifyUser.getBySpotifyId(
    session.spotify_id
  );
  const response = await fetch(
    `${baseUrl}/api/spotify/users/${session.spotify_id}/playlists?token=${session.accessToken}`
  ).catch((err) => {
    console.log("err:", err);
  });
  const playlists = await response.json();
  return {
    props: {
      spotifyUser: { ...spotifyUser } || {},
      playlists: playlists || {},
    },
  };
}

const UserAvatar = styled.img`
  height: 160px;
  width: auto;
`;

export default Profile;
