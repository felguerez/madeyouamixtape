/** @jsx jsx */
import { useEffect, useState } from "react";
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

const Vibes = ({ playlist }) => {
  const ids = playlist.tracks.items.map((item) => item.track.id);
  const [songs, setSongs] = useState<Record<string, number>[] | null>(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `/api/spotify/playlists/${playlist.id}/features?ids=${ids}`
        );
        const songs = await response.json();
        setSongs(songs.features);
      } catch (e) {
        console.log("e:", e);
      }
    }
    if (ids.length && !songs) {
      fetchData();
    }
  }, [ids]);
  if (!ids.length || !songs) return null;
  return (
    <div>
      <h3>vibes</h3>
      {songs.map((song) => {
        {
          return [
            "danceability",
            "energy",
            "loudness",
            "speechiness",
            "acousticness",
            "instrumentalness",
            "liveness",
            "valence",
          ].map((vibe) => {
            return <Vibe opacity={song[vibe]}>{vibe}</Vibe>;
          });
        }
      })}
    </div>
  );
};

const Vibe = styled.p<{ opacity: number }>`
  background: ${({ opacity }) => `rgba(200, 200, 200, ${opacity})`};
  display: inline-block;
  padding: 1rem;
`;
export default Vibes;
