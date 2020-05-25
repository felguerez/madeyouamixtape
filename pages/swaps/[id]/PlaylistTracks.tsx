import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { PlaylistTrack } from "../../../components/swaps/PlaylistTrack";

const PlaylistTracks = ({ playlist }) => {
  if (!playlist) return null;
  const ids = playlist.tracks.items.map((item) => item.track.id);
  useEffect(() => {
    if (ids.length) {
      fetch(`/api/spotify/playlists/${playlist.id}/features?ids=${ids}`);
    }
  }, [ids]);
  return (
    <TrackList>
      {playlist.tracks &&
        playlist.tracks.items.map((item, index) => (
          <PlaylistTrack item={item} key={item.track.id} index={index} />
        ))}
    </TrackList>
  );
};

const TrackList = styled.div`
  padding: 1rem 0 1rem 1rem;
  list-style: none;
  max-width: 50rem;
  margin: 0 auto;
`;

export default PlaylistTracks;
