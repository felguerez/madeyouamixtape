import fetch from "isomorphic-fetch";
import { useEffect, useState } from "react";
import { PlaylistGallery } from "./PlaylistGallery";
import { useUser } from "../lib/hooks";

export const Playlists = ({}: {}) => {
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
      <h2>
        {spotifyUser
          ? `Playlists by ${spotifyUser.display_name}`
          : "Loading your account ..."}
      </h2>
      <div>
        {playlists && playlists.length ? (
          <>
            <p>
              Select a playlist to send to one of your swap group mates. You'll
              get someone else's playlist when the swap happens.
            </p>
            <p>
              You can choose a different playlist to share until the swap group
              owner shuffles the mixes.
            </p>
            <PlaylistGallery playlists={playlists} />
          </>
        ) : (
          <p>Loading your playlists...</p>
        )}
      </div>
    </>
  );
};
