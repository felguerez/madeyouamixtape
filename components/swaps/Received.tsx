import fetch from "isomorphic-fetch";
import { useEffect, useState } from "react";
import { useUser } from "../../lib/hooks";
import styled from "@emotion/styled";
import { ButtonLink } from "../SwapManager";
import { css } from "@emotion/core";

export const ReceivedPlaylist = ({
  receivedPlaylistId,
}: {
  receivedPlaylistId: string;
}) => {
  const { spotifyUser } = useUser();
  const [playlist, setPlaylist] = useState<any>(null);
  useEffect(() => {
    async function fetchData() {
      const request = await fetch(
        `/api/spotify/playlists/${receivedPlaylistId}`
      ).catch((err) => {
        console.log("err:", err);
      });
      const playlist = await request.json();
      setPlaylist(playlist);
    }
    if (receivedPlaylistId) {
      fetchData().catch((err) => {});
    }
  }, [receivedPlaylistId]);

  const onFollow = async () => {
    const request = await fetch(
      `/api/spotify/playlists/${receivedPlaylistId}/follow`
    ).catch((err) => {
      console.log("err:", err);
    });
    if (request.ok) {
      alert("nice");
    }
  };
  console.log('playlist:', playlist);
  return (
    <BodyContent>
      <Title>
        {!spotifyUser
          ? "Loading your account ..."
          : `You've received a new playlist!`}
      </Title>
      {playlist && (
        <Container>
          <PlaylistCard>
            <CoverArt src={playlist.images[0].url} />
            <Metadata>
              <PlaylistName>{playlist.name}</PlaylistName>
              <TrackLength>{playlist.tracks.items.length} tracks</TrackLength>
              <Description
                dangerouslySetInnerHTML={{ __html: playlist.description }}
              />
              <Creator>
                by{" "}
                <a href={playlist.owner.href} target="_blank">
                  {playlist.owner.display_name}
                </a>
              </Creator>
              <ButtonLink
                css={css`
                  margin-top: 0.5rem;
                `}
                onClick={onFollow}
              >
                Follow this playlist
              </ButtonLink>
            </Metadata>
          </PlaylistCard>
        </Container>
      )}
    </BodyContent>
  );
};

const BodyContent = styled.div`
  padding: 2rem;
`;

const Title = styled.h2`
  padding: 0;
  margin: 1.35rem 0 0 0;
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

const PlaylistName = styled.h3`
  padding: 0;
  margin: 0 0 1rem 0;
`;

const Description = styled.p`
  margin: 0 0 0.5rem 0;
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

const TrackLength = styled.p`
  margin-bottom: 0.5rem;
`;
