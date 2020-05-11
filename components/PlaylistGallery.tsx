import styled from "@emotion/styled";
import { SwapMember } from "../lib/models/swapMember";
import { useEffect, useState } from "react";

export const PlaylistGallery = ({
  playlists,
  isEnrolled,
  swapMember,
}: {
  playlists: {
    images: { url: string }[];
    name: string;
    owner: { href: string; display_name: string };
    uri: string;
    id: string;
  }[];
  swapMember: SwapMember;
  isEnrolled: boolean;
}) => {
  const [activeUri, setActiveUri] = useState("");
  const onClick = async (uri) => {
    const response = await fetch(`/api/swap_members/${swapMember.id}/update`, {
      method: "post",
      body: JSON.stringify({
        selected_playlist_uri: uri,
        swap_id: swapMember.swap_id,
      }),
    });
    if (response.ok) {
      setActiveUri(uri);
    }
  };

  useEffect(() => {
    if (swapMember.selected_playlist_uri) {
      setActiveUri(swapMember.selected_playlist_uri);
    }
  }, [swapMember]);
  return (
    <Container>
      {playlists.map((playlist) => {
        const isActive = activeUri === playlist.uri;
        return (
          <Playlist key={playlist.id}>
            <CoverArt src={playlist.images[0].url} />
            <Metadata>
              <PlaylistName>{playlist.name}</PlaylistName>
              <Creator>
                by{" "}
                <a href={playlist.owner.href} target="_blank">
                  {playlist.owner.display_name}
                </a>
              </Creator>
            </Metadata>
            {isEnrolled && (
              <Button isActive={isActive} onClick={() => onClick(playlist.uri)}>
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
  background: #282828;
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
    background-color: ${({ isActive }) => (isActive ? "#97C4D7" : "#546e7a")};
  }
  background-color: ${({ isActive }) => (isActive ? "#97C4D7" : "#2e3c43")};
  border: ${({ isActive }) => (isActive ? "1px solid #B0BEC5" : null)};
  color: ${({ isActive }) => (isActive ? "#1E272C" : "#B0BEC5")};
`;
