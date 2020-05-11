import fetch from "isomorphic-fetch";
import { useEffect, useState } from "react";
import { useUser } from "../../lib/hooks";
import styled from "@emotion/styled";
import { SwapMember } from "../../lib/models/swapMember";

export const SelectedPlaylist = () => {
  const { spotifyUser } = useUser();
  const [playlist, setPlaylist] = useState<any>([]);
  useEffect(() => {
    async function fetchData() {
      const request = await fetch(
        `/api/spotify/users/${spotifyUser.spotify_id}/playlists`
      ).catch((err) => {
        console.log("err:", err);
      });
      const { items } = await request.json();
      setPlaylist(items);
    }
    if (spotifyUser) {
      // fetchData().catch((err) => {});
    }
  }, [spotifyUser]);
  return (
    <BodyContent>
      <Title>
        {spotifyUser ? `Your Selected Playlist` : "Loading your account ..."}
      </Title>
      <div></div>
    </BodyContent>
  );
};

const BodyContent = styled.div`
  padding: 0 2rem 2rem 2rem;
`;

const Title = styled.h2`
  padding: 0;
  margin: 1.25rem 0 0 0;
`;
