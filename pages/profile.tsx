import fetch from "isomorphic-fetch";
import * as models from "../lib/models";
import { SpotifyUser } from "../lib/models/spotifyUser";
import { getSession } from "../lib/iron";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Playlists } from "../components/Playlists";

const Profile = ({
  spotifyUser: { display_name, spotify_id },
  token,
}: {
  spotifyUser: SpotifyUser;
  token: string;
}) => {
  const [playlists, setPlaylists] = useState<any>([]);
  useEffect(() => {
    async function fetchData() {
      const request = await fetch(
        `/api/spotify/users/${spotify_id}/playlists?token=${token}`
      ).catch((err) => {
        console.log("err:", err);
      });
      const { items } = await request.json();
      setPlaylists(items);
    }
    if (token && spotify_id) {
      fetchData().catch((err) => {});
    }
  }, [token, spotify_id]);
  return (
    <>
      <h1>Playlists by {display_name}</h1>
      <div>
        {playlists && playlists.length ? (
          <>
            <p>{playlists.length} playlists. Send one of these to your boys!</p>
            <Playlists playlists={playlists} />
          </>
        ) : (
          <p>Loading your playlists...</p>
        )}
      </div>
    </>
  );
};

export async function getServerSideProps({ req, res }) {
  const session = await getSession(req);
  if (!session) {
    res.writeHead(302, {
      Location: "/",
    });
    return res.end();
  }
  const spotifyUser = await models.spotifyUser.getBySpotifyId(
    session.spotify_id
  );
  return {
    props: {
      spotifyUser: { ...spotifyUser } || {},
      token: session?.accessToken || "",
    },
  };
}

export default Profile;
