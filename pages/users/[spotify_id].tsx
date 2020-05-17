import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { PlaylistCard } from "../../components/PlaylistCard";

const SpotifyProfile = () => {
  const router = useRouter();
  const [spotifyProfile, setSpotifyProfile] = useState<null | {
    display_name: string;
    followers: { href: string; total: number };
  }>(null);
  const [playlists, setPlaylists] = useState([]);
  const { spotify_id } = router.query;
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/spotify/users/${spotify_id}`);
        const spotifyProfile = await response.json();
        setSpotifyProfile(spotifyProfile);
      } catch (e) {
        console.log("e:", e);
      }
    }
    if (spotify_id) {
      fetchData();
    }
  }, [spotify_id]);
  useEffect(() => {
    async function fetchData() {
      const request = await fetch(`/api/spotify/users/${spotify_id}/playlists`);
      const playlists = await request.json();
      setPlaylists(playlists.items);
    }
    if (spotify_id) {
      fetchData();
    }
  }, [spotify_id]);
  return (
    <div>
      <h2>Profile for {router.query.spotify_id}</h2>
      {spotifyProfile && (
        <div>
          <h3>{spotifyProfile.display_name}</h3>
          <p>{spotifyProfile.followers.total} followers</p>
          <Container>
            {playlists.map((playlist) => {
              return <PlaylistCard key={playlist.id} playlist={playlist} />;
            })}
          </Container>
        </div>
      )}
    </div>
  );
};

const Container = styled.ul`
  list-style: none;
  padding-left: 0;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 1rem;
`;
export default SpotifyProfile;
