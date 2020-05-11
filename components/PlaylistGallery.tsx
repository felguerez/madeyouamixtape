import styled from "@emotion/styled";

export const PlaylistGallery = ({
  playlists,
  isEnrolled,
}: {
  playlists: {
    id: number;
    images: { url: string }[];
    name: string;
    owner: { href: string; display_name: string };
  }[];
  isEnrolled: boolean;
}) => {
  return (
    <Container>
      {playlists.map((playlist) => {
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
            {isEnrolled && <Button>Select</Button>}
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

const Button = styled.button`
  padding: 0.25rem;
  margin-top: 1rem;
  font-size: 0.875rem;
  &:hover {
    background-color: #546e7a;
  }
`;
