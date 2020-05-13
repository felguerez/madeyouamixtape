import fetch from "isomorphic-fetch";
import { useEffect } from "react";
import { PlaylistGallery } from "./PlaylistGallery";
import { useUser } from "../lib/hooks";
import styled from "@emotion/styled";
import { useSwapDispatch, useSwapState } from "../contexts/swap-context";

export const Playlists = () => {
  const { spotifyUser } = useUser();
  const { selectedPlaylistId, playlists } = useSwapState();
  const dispatch = useSwapDispatch();
  useEffect(() => {
    async function fetchData() {
      const request = await fetch(
        `/api/spotify/users/${spotifyUser.spotify_id}/playlists`
      ).catch((err) => {
        console.log("err:", err);
      });
      const playlists = await request.json();
      dispatch({ type: "SET_PLAYLISTS", playlists });
    }
    if (spotifyUser) {
      fetchData().catch((err) => {});
    }
  }, [spotifyUser]);
  return (
    <BodyContent>
      <Title>
        {spotifyUser ? `Your Playlists` : "Loading your account ..."}
      </Title>
      <div>
        {playlists && playlists.items.length ? (
          <>
            <p>
              Select a playlist to send to one of your swap group mates. You'll
              get someone else's playlist in return when they're shuffled.
            </p>
            <p>
              You can change your mind and choose a different playlist to share
              until the swap group owner shuffles the mixes.
            </p>
            <PlaylistGallery
              playlists={playlists.items}
              selectedPlaylistId={selectedPlaylistId}
            />
          </>
        ) : (
          <p>Loading your playlists...</p>
        )}
      </div>
    </BodyContent>
  );
};

const BodyContent = styled.div`
  padding: 0;
`;

const Title = styled.h2`
  margin: 1.3rem 0 0 0;
`;
