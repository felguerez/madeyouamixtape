import * as constants from "../../../lib/constants";
import { getSession } from "../../../lib/iron";
import { Card, CopyContainer } from "../../../shared/styles";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import { msToTime } from "../../../lib/utils";
import ms from "ms";

const PlaylistTracks = ({ playlist }) => {
  if (!playlist) {
    return <h2>Loading...</h2>;
  }

  return (
    <TrackList>
      {playlist.tracks &&
        playlist.tracks.items.map((item) => {
          console.log("item.track:", item.track);
          return (
            <Track key={item.id}>
              {item.track.album.images && (
                <CoverArt src={item.track.album.images[0]?.url} alt="" />
              )}
              <TrackMetadata>
                <p>
                  <strong>
                    {item.track.artists.map((artist) => artist.name).join(", ")}
                  </strong>
                  <span>
                    <Bullet>&bull;</Bullet>
                    {item.track.name}
                  </span>
                </p>
                <Details>
                  <AlbumName>{item.track.album.name}</AlbumName>{" "}
                  <Duration>
                    {ms(item.track.duration_ms, { long: true })}
                  </Duration>
                </Details>
              </TrackMetadata>
              {item.track.preview_url && (
                <audio>
                  <source src={item.track.preview_url} type="audio/mpeg" />
                </audio>
              )}
            </Track>
          );
        })}
    </TrackList>
  );
};

const TrackList = styled.div`
  padding: 1rem;
  list-style: none;
`;

const Bullet = styled.span`
  margin: 0 0.5rem;
  font-size: 0.75rem;
  vertical-align: middle;
`;

const TrackMetadata = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  p {
    margin: 0 0 0 1rem;
  }
`;

const Details = styled.p`
  color: rgb(179, 179, 179);
  font-size: 0.75rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const CoverArt = styled.img`
  height: 64px;
  width: 64px;
`;

const Track = styled.li`
  display: flex;
  margin-bottom: 1rem;
  &:last-of-type {
    margin-bottom: 0;
  }
`;

const AlbumName = styled.strong`
  margin-right: 1rem;
  margin-bottom: auto;
`;

const Duration = styled.span`
  margin-top: 0.5rem;
  display: inline-block;
`;

export default PlaylistTracks;
