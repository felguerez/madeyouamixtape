import fetch from "isomorphic-fetch";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useSwapDispatch, useSwapState } from "../../contexts/swap-context";
import { CHARCOAL, ContentCard, DARK_GRAY, GRAY } from "../../shared/styles";
import { ButtonLink } from "../SwapManager";
import Link from "next/link";
import PlaylistTracks from "../../pages/swaps/[id]/PlaylistTracks";
import Vibes from "../Vibes";
import { useFeatures } from "../../lib/hooks";

export const SelectedPlaylist = ({
  currentSwapMember: { selected_playlist_id },
}) => {
  const dispatch = useSwapDispatch();
  const { selectedPlaylist, selectedPlaylistId } = useSwapState();
  const [isOpen, setIsOpen] = useState(false);

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
      fetchData().catch((err) => {
        console.log("err:", err);
      });
    }
  }, [selectedPlaylistId]);

  const features = useFeatures({
    ids: selectedPlaylist?.tracks?.items?.map((item) => item.track.id),
    playlistId: selectedPlaylist?.id,
  });
  if (!selectedPlaylist)
    return (
      <BodyContent>
        <h2>Loading...</h2>
      </BodyContent>
    );
  return (
    <BodyContent>
      <Container>
        <h2>Selection</h2>
        <p>
          This playlist will be shared with someone else in your group. You'll
          get a new playlist in return.
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
              {features && (
                <Toggler onClick={() => setIsOpen((isOpen) => !isOpen)}>
                  {isOpen ? "Close" : "Check the vibes"}
                </Toggler>
              )}
              {!features && (
                <p>
                  Don't like this one?{" "}
                  <ButtonLink
                    onClick={() =>
                      dispatch({
                        type: "SET_ACTIVE_TAB",
                        activeTab: "selector",
                      })
                    }
                  >
                    Choose a new playlist to share
                  </ButtonLink>
                </p>
              )}
            </Copy>
            {!isOpen ? (
              <>
                <Creator>
                  By{" "}
                  <Link
                    as={`/users/${selectedPlaylist.owner.id}`}
                    href="/users/[spotify_id]"
                  >
                    <a>{selectedPlaylist.owner.display_name}</a>
                  </Link>
                </Creator>
                <TracksCount>
                  {selectedPlaylist.tracks.items.length} tracks
                </TracksCount>
              </>
            ) : (
              <>
                <p>
                  Don't like this one?{" "}
                  <ButtonLink
                    onClick={() =>
                      dispatch({
                        type: "SET_ACTIVE_TAB",
                        activeTab: "selector",
                      })
                    }
                  >
                    Choose a new playlist to share
                  </ButtonLink>
                </p>
                <Vibes features={features} />
              </>
            )}
          </Metadata>
        </ContentCard>
      </Container>
      <PlaylistTracks playlist={selectedPlaylist} />
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
  border: 1px solid ${DARK_GRAY};
`;

const TracksCount = styled.p`
  margin: 0;
  color: rgb(179, 179, 179);
  font-size: 12px;
`;

const Toggler = styled(ButtonLink)`
  margin-bottom: 0;
  cursor: pointer;
`;
