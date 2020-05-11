import fetch from "isomorphic-fetch";
import { useEffect, useState } from "react";
import { PlaylistGallery } from "./PlaylistGallery";
import { useUser } from "../lib/hooks";
import styled from "@emotion/styled";
import { SwapMember } from "../lib/models/swapMember";

export const Playlists = ({
  isEnrolled,
  swapMember,
}: {
  isEnrolled: boolean;
  swapMember: SwapMember;
}) => {
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
    <BodyContent>
      <h2>{spotifyUser ? `Your Playlists` : "Loading your account ..."}</h2>
      <div>
        {playlists && playlists.length ? (
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
              playlists={playlists}
              isEnrolled={isEnrolled}
              swapMember={swapMember}
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
  padding: 2rem;
`;
