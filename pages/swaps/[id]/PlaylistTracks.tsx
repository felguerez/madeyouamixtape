import React from "react";
import styled from "@emotion/styled";
import { PlaylistTrack } from "../../../components/swaps/PlaylistTrack";

const PlaylistTracks = ({ playlist }) => {
  if (!playlist) return null;
  return (
    <TrackList>
      {playlist.tracks &&
        playlist.tracks.items.map((item) => (
          <PlaylistTrack item={item} key={item.track.id} />
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
