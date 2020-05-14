import fetch from "isomorphic-fetch";
import { useEffect } from "react";
import { useUser } from "../../lib/hooks";
import styled from "@emotion/styled";
import { useSwapDispatch, useSwapState } from "../../contexts/swap-context";
import {DARK_GRAY, GRAY, SEPIA} from "../../shared/styles";

export const SelectedPlaylist = () => {
  const { spotifyUser } = useUser();
  const dispatch = useSwapDispatch();
  const {
    selectedPlaylist,
    selectedPlaylistId,
  } = useSwapState();
  useEffect(() => {
    async function fetchData() {
      const request = await fetch(
        `/api/spotify/playlists/${selectedPlaylistId}`
      ).catch((err) => {
        console.log("err:", err);
      });
      const playlist = await request.json();
      dispatch({ type: "SET_SELECTED_PLAYLIST", playlist });
    }
    if (selectedPlaylistId) {
      fetchData().catch((err) => {});
    }
  }, [selectedPlaylistId]);
  return (
    <BodyContent>
      <Title>
        {!spotifyUser
          ? "Loading your account ..."
          : selectedPlaylist
          ? `Your Selected Playlist`
          : "Select a playlist to share"}
      </Title>
      {selectedPlaylist && (
        <Container>
          <PlaylistCard>
            {selectedPlaylist.images.length && (
              <CoverArt src={selectedPlaylist.images[0].url} />
            )}
            <Metadata>
              <PlaylistName>{selectedPlaylist.name}</PlaylistName>
              <p>{selectedPlaylist.tracks.items.length} tracks</p>
              <Description
                dangerouslySetInnerHTML={{
                  __html: selectedPlaylist.description,
                }}
              />
              <Creator>
                by{" "}
                <a href={selectedPlaylist.owner.href} target="_blank">
                  {selectedPlaylist.owner.display_name}
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
  padding: 0;
`;

const Title = styled.h2`
  padding: 0;
  margin: 1.3rem 0 0 0;
`;

const Container = styled.div`
  margin-top: 1rem;
`;

const PlaylistCard = styled.div`
  background: ${DARK_GRAY};
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  box-shadow: 0 2px 2px -2px rgba(0,0,0,.2);
`;

const PlaylistName = styled.h3`
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
