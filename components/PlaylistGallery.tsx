import styled from "@emotion/styled";
import React, { useEffect } from "react";
import { useSwapDispatch } from "../contexts/swap-context";
import {
  DARK_BLUE,
  DARK_GREEN,
  OFF_WHITE,
  LIGHT_GREEN,
  SEPIA,
  WHITE,
} from "../shared/styles";
import { SwapMember } from "../lib/models/swapMember";
import { PlaylistCard } from "./PlaylistCard";
import { updateSwapMember } from "../lib/api";

export const PlaylistGallery = ({
  currentSwapMember,
  currentSwapMember: { selected_playlist_id },
  playlists,
  selectedPlaylistId,
}: {
  playlists: {
    images: { url: string }[];
    name: string;
    owner: { href: string; display_name: string; id: string };
    uri: string;
    id: string;
  }[];
  selectedPlaylistId: string;
  currentSwapMember: SwapMember & { isEnrolled: boolean; spotifyId: string };
}) => {
  const dispatch = useSwapDispatch();
  const onClick = async (id) => {
    const currentSelectedId = selectedPlaylistId;
    dispatch({ type: "SET_SELECTED_PLAYLIST_ID", selectedPlaylistId: id });
    try {
      await updateSwapMember({
        swap_member_id: currentSwapMember.id,
        selected_playlist_id: id,
        swap_id: currentSwapMember.id,
      });
      dispatch({
        type: "SET_SELECTED_PLAYLIST_ID",
        selectedPlaylistId: id,
      });
    } catch (err) {
      console.log("err:", err);
      dispatch({
        type: "SET_SELECTED_PLAYLIST_ID",
        selectedPlaylistId: currentSelectedId,
      });
    }
  };

  useEffect(() => {
    if (selected_playlist_id) {
      dispatch({
        type: "SET_SELECTED_PLAYLIST_ID",
        selectedPlaylistId: selected_playlist_id,
      });
    }
  }, [selected_playlist_id]);
  return (
    <Container>
      {playlists.map((playlist) => {
        const isActive = selectedPlaylistId === playlist.id;
        return (
          <PlaylistCard key={playlist.id} playlist={playlist}>
            {currentSwapMember.isEnrolled && (
              <Button isActive={isActive} onClick={() => onClick(playlist.id)}>
                {isActive ? "Selected" : "Select"}
              </Button>
            )}
          </PlaylistCard>
        );
      })}
    </Container>
  );
};

const Container = styled.ul`
  list-style: none;
  padding-left: 0;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 1rem;
`;

const Button = styled.button<{ isActive: boolean }>`
  padding: 0.25rem;
  margin-top: 1rem;
  font-size: 0.875rem;
  width: 100%;
  &:hover {
    background-color: ${({ isActive }) =>
      isActive ? DARK_GREEN : LIGHT_GREEN};
  }
  background-color: ${({ isActive }) => (isActive ? DARK_GREEN : DARK_BLUE)};
  border: ${({ isActive }) =>
    isActive ? `1px solid ${LIGHT_GREEN}` : `1px solid ${SEPIA}`};
  color: ${({ isActive }) => (isActive ? OFF_WHITE : WHITE)};
`;
