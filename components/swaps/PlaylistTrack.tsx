import React, { useState } from "react";
import ms from "ms";
import styled from "@emotion/styled";
import { GRAY, OFF_WHITE } from "../../shared/styles";
import { useSwapDispatch, useSwapState } from "../../contexts/swap-context";

export const PlaylistTrack = ({ item }: { item: any }) => {
  const audioRef = React.createRef<HTMLAudioElement>();
  const [isPlaying, setIsPlaying] = useState(false);
  const dispatch = useSwapDispatch();
  const { node } = useSwapState();
  const playAudio = (_e) => {
    setIsPlaying((isPlaying) => !isPlaying);
    if (audioRef && audioRef.current) {
      if (isPlaying) {
        node.pause();
        node.currentTime = 0;
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        return;
      }
      dispatch({ type: "SET_PLAYING_NODE", node: audioRef.current });
      audioRef.current.play();
    }
  };
  return (
    <Track key={item.id}>
      <PlayButtonContainer background={item.track.album.images[0]?.url}>
        {item.track.album.images && (
          <PlayButton onClick={playAudio}>
            <i className="material-icons">
              {isPlaying ? "pause_circle_outline" : "play_circle_outline"}
            </i>
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
          <Duration>{ms(item.track.duration_ms, { long: true })}</Duration>
        </Details>
      </TrackMetadata>
      {item.track.preview_url && (
        <audio ref={audioRef}>
          <source src={item.track.preview_url} type="audio/mpeg" />
        </audio>
      )}
    </Track>
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
  color: ${OFF_WHITE};
  &:active {
    color: ${GRAY};
  }
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
