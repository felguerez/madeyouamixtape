import * as constants from "../../../lib/constants";
import { getSession } from "../../../lib/iron";
import { Card, CopyContainer } from "../../../shared/styles";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import { msToTime } from "../../../lib/utils";

const PlaylistTracks = ({ playlist }) => {
  if (!playlist) {
    return <h2>Loading...</h2>;
  }

  return (
    <CopyContainer>
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
                      {item.track.artists
                        .map((artist) => artist.name)
                        .join(", ")}
                    </strong>
                    <span>
                      <Bullet>&bull;</Bullet>
                      {item.track.name}
                    </span>
                  </p>
                  <Details>
                    <Album>{item.track.album.name}</Album>{" "}
                    {msToTime(item.track.duration_ms)}
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
    </CopyContainer>
  );
};

const TrackList = styled.div`
  padding-left: 0;
  list-style: none;
`;

const Bullet = styled.span`
  margin: 0 0.25rem;
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

const Album = styled.strong`
  margin-right: 1rem;
`;

export default PlaylistTracks;
