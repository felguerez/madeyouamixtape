import React from "react";
import { DARK_GRAY, GRAY } from "../../../shared/styles";
import styled from "@emotion/styled";
import ms from "ms";
import { PlaylistTrack } from "../../../components/swaps/PlaylistTrack";

const PlaylistTracks = ({ playlist }) => {
  if (!playlist) {
    return <h2>Loading...</h2>;
  }
  return (
    <TrackList>
      {playlist.tracks &&
        playlist.tracks.items.map((item) => {
          console.log("item.track:", item.track);
          return <PlaylistTrack item={item} />;
        })}
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
