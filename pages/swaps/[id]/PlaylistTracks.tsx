import { DARK_GRAY, GRAY } from "../../../shared/styles";
import styled from "@emotion/styled";
import ms from "ms";

const PlaylistTracks = ({ playlist }) => {
  if (!playlist) {
    return <h2>Loading...</h2>;
  }
  const audioRef = React.createRef<HTMLAudioElement>();
  const playAudio = (e) => {
    console.log("e:", e);
    if (audioRef && audioRef.current) {
      audioRef.current.play();
    }
  };
  return (
    <TrackList>
      {playlist.tracks &&
        playlist.tracks.items.map((item) => {
          console.log("item.track:", item.track);
          return (
            <Track key={item.id}>
              <PlayButtonContainer background={item.track.album.images[0]?.url}>
                {item.track.album.images && (
                  <PlayButton onClick={playAudio}>
                    <i className="material-icons">play_circle_outline</i>
                  </PlayButton>
                )}
              </PlayButtonContainer>
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
                <audio ref={audioRef}>
                  <source src={item.track.preview_url} type="audio/mpeg" />
                </audio>
              )}
            </Track>
          );
        })}
      <style jsx global>{`
        .material-icons {
          font-size: 32px;
        }
      `}</style>
    </TrackList>
  );
};

const PlayButtonContainer = styled.div<{ background: string }>`
  position: relative;
  height: 64px;
  width: 64px;
  background-image: ${({ background }) =>
    `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${background})`};
  background-size: cover;
  cursor: pointer;
  &:hover {
    background-image: ${({ background }) =>
      `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, .25)), url(${background})`};
  }
`;

const PlayButton = styled.div`
  position: absolute;
  height: 64px;
  width: 64px;
  top: 25%;
  left: 25%;
  color: ${GRAY};
  &:active {
    color: ${DARK_GRAY};
  }
`;
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
