import Link from "next/link";
import styled from "@emotion/styled";
import { DARK_GRAY, GRAY } from "../shared/styles";
import { ReactNode } from "react";

export const PlaylistCard = ({
  playlist,
  children,
}: {
  playlist: any;
  children?: ReactNode;
}) => {
  return (
    <Playlist key={playlist.id}>
      {playlist.images.length && <CoverArt src={playlist.images[0].url} />}
      <Metadata>
        <PlaylistName>{playlist.name}</PlaylistName>
        <Creator>
          by{" "}
          <Link href={`/users/[spotify_id]`} as={`/users/${playlist.owner.id}`}>
            <a>{playlist.owner.display_name}</a>
          </Link>
        </Creator>
      </Metadata>
      {children}
    </Playlist>
  );
};

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
