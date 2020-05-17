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
      <style jsx global>{`
        .material-icons {
          font-size: 32px;
        }
      `}</style>
    </TrackList>
  );
};

const TrackList = styled.div`
  padding: 1rem;
  list-style: none;
`;

export default PlaylistTracks;
