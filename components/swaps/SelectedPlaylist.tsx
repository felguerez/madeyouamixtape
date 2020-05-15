import fetch from "isomorphic-fetch";
import { useEffect } from "react";
import styled from "@emotion/styled";
import { useSwapDispatch, useSwapState } from "../../contexts/swap-context";
import { ContentCard } from "../../shared/styles";
import { ButtonLink } from "../SwapManager";

export const SelectedPlaylist = ({
  currentSwapMember: { selected_playlist_id },
}) => {
  const dispatch = useSwapDispatch();
  const { selectedPlaylist, selectedPlaylistId } = useSwapState();
  useEffect(() => {
    if (!selectedPlaylistId) {
      dispatch({
        type: "SET_SELECTED_PLAYLIST_ID",
        selectedPlaylistId: selected_playlist_id,
      });
    }
  }, [selected_playlist_id]);

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
  console.log("selectedPlaylist:", selectedPlaylist);
  return (
    <BodyContent>
      {selectedPlaylist ? (
        <Container>
          <h2>Selection</h2>
          <p>
            Don't like this one?{" "}
            <ButtonLink
              onClick={() =>
                dispatch({
                  type: "SET_PLAYLIST_VIEWER",
                  playlistViewer: "selector",
                })
              }
            >
              Choose a new playlist to share
            </ButtonLink>
          </p>
          <ContentCard>
            {selectedPlaylist.images?.length && (
              <CoverArt src={selectedPlaylist.images[0].url} />
            )}
            <Metadata>
              <Copy>
                <PlaylistName>{selectedPlaylist.name}</PlaylistName>
                <Description
                  dangerouslySetInnerHTML={{
                    __html: selectedPlaylist.description,
                  }}
                />
              </Copy>
              <Creator>
                By{" "}
                <a href={selectedPlaylist.owner.href} target="_blank">
                  {selectedPlaylist.owner.display_name}
                </a>
              </Creator>
              <TracksCount>
                {selectedPlaylist.tracks.items.length} tracks
              </TracksCount>
            </Metadata>
          </ContentCard>
        </Container>
      ) : (
        <Container>
          <h2>Loading...</h2>
        </Container>
      )}
    </BodyContent>
  );
};

const BodyContent = styled.div`
  padding: 0;
`;

const Container = styled.div`
  margin-top: 1rem;
`;

const PlaylistName = styled.h3`
  padding: 0;
  margin: 0;
`;

const Copy = styled.div`
  margin: 0 0 auto 0;
`;

const Description = styled.p`
  margin: 0;
`;

const Creator = styled.p`
  display: inline-block;
  margin-bottom: 0;
`;

const Metadata = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const CoverArt = styled.img`
  height: auto;
  width: 160px;
  border-radius: 8px;
  align-self: center;
  margin-right: 1rem;
`;

const TracksCount = styled.p`
  margin: 0;
  color: rgb(179, 179, 179);
  font-size: 12px;
`;
