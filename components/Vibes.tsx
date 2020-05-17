/** @jsx jsx */
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { DARK_BLUE, vibeColors, WHITE } from "../shared/styles";
import { css, jsx } from "@emotion/core";

const Vibes = ({ playlist }) => {
  const ids = playlist.tracks.items.map((item) => item.track.id);
  const [features, setFeatures] = useState<Record<string, number>[] | null>(
    null
  );
  useEffect(() => {
    async function fetchData() {
      try {
        const request = await fetch(
          `/api/spotify/playlists/${playlist.id}/features?ids=${ids}`
        );
        const response = await request.json();
        setFeatures(response.features);
      } catch (e) {
        console.log("e:", e);
      }
    }
    if (ids.length && !features) {
      fetchData();
    }
  }, [ids]);
  if (!ids.length || !features) return null;
  const averageFeatures = features.reduce(
    (accumulator, feature, i) => {
      Object.keys(accumulator).forEach((key) => {
        accumulator[key] = accumulator[key] + feature[key];
        if (i === features.length - 1) {
          accumulator[key] = accumulator[key] / i;
        }
      });
      return accumulator;
    },
    {
      danceability: 0,
      energy: 0,
      loudness: 0,
      speechiness: 0,
      acousticness: 0,
      instrumentalness: 0,
      liveness: 0,
      valence: 0,
    }
  );
  console.log("averageFeatures:", averageFeatures);
  return (
    <div>
      <h3>vibes</h3>
      {Object.keys(averageFeatures).map((vibe) => {
        return (
          <Vibe opacity={averageFeatures[vibe]} rgb={vibeColors[vibe]}>
            <span>{vibe}</span>
            <span
              css={css`
                width: ${averageFeatures[vibe] * 100}%;
              `}
            />
          </Vibe>
        );
      })}
    </div>
  );
};

const Vibe = styled.div<{ opacity: number; rgb: string }>`
  background: ${({ opacity, rgb }) => `rgba(${rgb}, ${opacity})`};
  display: inline-block;
  padding: 1rem;
  color: ${({ opacity }) => (opacity > 0.5 ? WHITE : DARK_BLUE)};
  border-radius: 0.5rem;
  margin-right: 1rem;
  border: ${({ rgb }) => `1px solid rgba(${rgb}, 1)`};
`;

export default Vibes;
