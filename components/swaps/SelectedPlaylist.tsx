import fetch from "isomorphic-fetch";
import { useEffect, useState } from "react";
import { useUser } from "../../lib/hooks";
import styled from "@emotion/styled";

export const SelectedPlaylist = ({ selectedId }: { selectedId: string }) => {
  const { spotifyUser } = useUser();
  const [playlist, setPlaylist] = useState<any>(null);
  useEffect(() => {
    async function fetchData() {
      const request = await fetch(`/api/spotify/playlists/${selectedId}`).catch(
        (err) => {
          console.log("err:", err);
        }
      );
      const playlist = await request.json();
      setPlaylist(playlist);
    }
    if (selectedId) {
      fetchData().catch((err) => {});
    }
  }, [selectedId]);
  return (
    <BodyContent>
      <Title>
        {!spotifyUser
          ? "Loading your account ..."
          : selectedId
          ? `Your Selected Playlist`
          : "Select a playlist to share"}
      </Title>
      {playlist && (
        <Container>
          <PlaylistCard>
            <CoverArt src={playlist.images[0].url} />
            <Metadata>
              <PlaylistName>{playlist.name}</PlaylistName>
              <p>{playlist.tracks.length} tracks</p>
              <Description
                dangerouslySetInnerHTML={{ __html: playlist.description }}
              />
              <Creator>
                by{" "}
                <a href={playlist.owner.href} target="_blank">
                  {playlist.owner.display_name}
                </a>
              </Creator>
            </Metadata>
          </PlaylistCard>
        </Container>
      )}
    </BodyContent>
  );
};

const BodyContent = styled.div`
  padding: 0 2rem 2rem 2rem;
`;

const Title = styled.h2`
  padding: 0;
  margin: 1.3rem 0 0 0;
`;

const Container = styled.div`
  margin-top: 1rem;
`;

const PlaylistCard = styled.div`
  background: #282828;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
`;

const PlaylistName = styled.h4`
  padding: 0;
  margin: 0 0 1rem 0;
`;

const Description = styled.p`
  margin: 0;
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
  margin-right: 1rem;
`;
