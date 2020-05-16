import styled from "@emotion/styled";
import { useEffect } from "react";
import { useSwapDispatch } from "../contexts/swap-context";
import {
  DARK_BLUE,
  GRAY,
  DARK_GREEN,
  OFF_WHITE,
  LIGHT_GREEN,
  SEPIA,
  WHITE,
  DARK_GRAY,
} from "../shared/styles";
import { SwapMember } from "../lib/models/swapMember";
import Link from "next/link";

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
    const response = await fetch(
      `/api/swap_members/${currentSwapMember.id}/update`,
      {
        method: "post",
        body: JSON.stringify({
          selected_playlist_id: id,
          swap_id: currentSwapMember.swap_id,
        }),
      }
    );
    if (!response.ok) {
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
          <Playlist key={playlist.id}>
            {playlist.images.length && (
              <CoverArt src={playlist.images[0].url} />
            )}
            <Metadata>
              <PlaylistName>{playlist.name}</PlaylistName>
              <Creator>
                by{" "}
                <Link
                  href={`/users/[spotify_id]`}
                  as={`/users/${playlist.owner.id}`}
                >
                  <a>{playlist.owner.display_name}</a>
                </Link>
              </Creator>
            </Metadata>
            {currentSwapMember.isEnrolled && (
              <Button isActive={isActive} onClick={() => onClick(playlist.id)}>
                {isActive ? "Selected" : "Select"}
              </Button>
            )}
          </Playlist>
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

const Playlist = styled.li`
  grid-column: span 1;
  background: ${GRAY};
  box-shadow: 0 2px 2px -2px ${DARK_GRAY};
  border: 1px solid ${DARK_GRAY};
  font-size: 14px;
  font-weight: bold;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
`;

const Creator = styled.span`
  color: rgb(179, 179, 179);
  font-size: 12px;
  display: inline-block;
`;

const Metadata = styled.div`
  display: flex;
  flex-direction: column;
`;

const CoverArt = styled.img`
  height: auto;
  width: 160px;
  border-radius: 8px;
  align-self: center;
  margin-bottom: 1rem;
`;

const PlaylistName = styled.strong`
  text-overflow: ellipsis;
  width: 160px;
  overflow: hidden;
  white-space: nowrap;
  margin-bottom: 0.5rem;
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
