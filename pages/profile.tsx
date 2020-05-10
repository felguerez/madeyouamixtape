import fetch from "isomorphic-fetch";
import * as models from "../lib/models";
import { SpotifyUser } from "../lib/models/spotifyUser";
import { getSession } from "../lib/iron";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Playlists } from "../components/Playlists";
import { useUser } from "../lib/hooks";

const Profile = ({}: {}) => {
  const { spotifyUser } = useUser();
  const [playlists, setPlaylists] = useState<any>([]);
  useEffect(() => {
    async function fetchData() {
      const request = await fetch(
        `/api/spotify/users/${spotifyUser.spotify_id}/playlists`
      ).catch((err) => {
        console.log("err:", err);
      });
      const { items } = await request.json();
      setPlaylists(items);
    }
    if (spotifyUser) {
      fetchData().catch((err) => {});
    }
  }, [spotifyUser]);
  return (
    <>
      <h1>
        {spotifyUser
          ? `Playlists by ${spotifyUser.display_name}`
          : "Loading your account ..."}
      </h1>
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

export default Profile;
