import fetch from "isomorphic-fetch";
import { useEffect } from "react";
import { PlaylistGallery } from "./PlaylistGallery";
import styled from "@emotion/styled";
import { useSwapDispatch, useSwapState } from "../contexts/swap-context";
import { SwapMember } from "../lib/models/swapMember";
import { CopyContainer } from "../shared/styles";

export const Playlists = ({
  currentSwapMember,
  currentSwapMember: { spotifyId },
}: {
  currentSwapMember: SwapMember & { isEnrolled: boolean; spotifyId: string };
}) => {
  const { selectedPlaylistId, playlists } = useSwapState();
  const dispatch = useSwapDispatch();
  useEffect(() => {
    async function fetchData() {
      const request = await fetch(
        `/api/spotify/users/${spotifyId}/playlists`
      ).catch((err) => {
        console.log("err:", err);
      });
      const playlists = await request.json();
      dispatch({ type: "SET_PLAYLISTS", playlists });
    }
    if (spotifyId) {
      fetchData().catch((err) => {});
    }
  }, [spotifyId]);
  return (
    <div>
      {playlists && playlists.items.length ? (
        <>
          <h2>Choose a playlist to share</h2>
          <p>
            Select a playlist to send to one of your swap group mates. You'll
            get someone else's playlist in return when they're shuffled.
          </p>
          <p>
            You can change your mind and choose a different playlist to share
            until the swap group owner shuffles the mixes.
          </p>
          <PlaylistGallery
            currentSwapMember={currentSwapMember}
            playlists={playlists.items}
            selectedPlaylistId={selectedPlaylistId}
          />
        </>
      ) : (
        <p>Loading your playlists...</p>
      )}
    </div>
  );
};

const BodyContent = styled.div`
  padding: 0;
`;

const Title = styled.h2`
  margin: 1.3rem 0 0 0;
`;
