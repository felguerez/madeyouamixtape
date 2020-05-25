import fetch from "isomorphic-fetch";
import { useEffect, useState } from "react";
import { useFeatures, useUser } from "../../lib/hooks";
import styled from "@emotion/styled";
import { SecretlyButton } from "../SwapManager";
import { css } from "@emotion/core";
import { useSwapDispatch, useSwapState } from "../../contexts/swap-context";
import { Notification } from "../Notification";
import {
  BackgroundSheet,
  ContentCard,
  GRAY,
  Creator,
} from "../../shared/styles";
import PlaylistTracks from "../../pages/swaps/[id]/PlaylistTracks";
import Vibes from "../Vibes";

export const ReceivedPlaylist = ({ swap, receivedPlaylistId }) => {
  const user = useUser();
  const [notification, setNotification] = useState("");
  const dispatch = useSwapDispatch();
  const { receivedPlaylist } = useSwapState();
  const [isOpen, setIsOpen] = useState(false);
  const features = useFeatures({
    ids: receivedPlaylist?.tracks?.items?.map((item) => item.track.id),
    playlistId: receivedPlaylist?.id,
  });

  useEffect(() => {
    async function fetchData() {
      const request = await fetch(
        `/api/spotify/playlists/${receivedPlaylistId}`
      ).catch((err) => {
        console.log("err:", err);
      });
      const playlist = await request.json();
      dispatch({ type: "SET_RECEIVED_PLAYLIST", playlist });
    }

    if (receivedPlaylistId && !receivedPlaylist) {
      fetchData().catch((err) => {
        console.log("err:", err);
      });
    }
  }, [receivedPlaylistId]);

  const onFollow = async () => {
    const request = await fetch(
      `/api/spotify/playlists/${receivedPlaylistId}/follow`
    ).catch((err) => {
      console.log("err:", err);
    });
    if (request.ok) {
      setNotification("You're subscribed! Check your Library in Spotify");
    }
  };
  const sender = swap.members.filter(
    (member) => member.selected_playlist_id === receivedPlaylistId
  )[0];
  return (
    <div>
      {notification && (
        <Notification
          notification={notification}
          setNotification={setNotification}
        />
      )}
      {receivedPlaylist ? (
        <Container>
          <ContentCard>
            {receivedPlaylist.images.length && (
              <CoverArt src={receivedPlaylist.images[0].url} />
            )}
            <Metadata>
              <Copy>
                <PlaylistName>
                  {receivedPlaylist.name}{" "}
                  <Favorite onClick={onFollow}>
                    <i className="material-icons">favorite</i>
                  </Favorite>
                </PlaylistName>
                {receivedPlaylist.description && (
                  <Description
                    dangerouslySetInnerHTML={{
                      __html: receivedPlaylist.description,
                    }}
                  />
                )}
                <Toggler onClick={() => setIsOpen((isOpen) => !isOpen)}>
                  {isOpen ? "Close" : "Check the vibes"}
                </Toggler>
              </Copy>
              {!isOpen ? (
                <>
                  <Creator>
                    by{" "}
                    <a href={receivedPlaylist.owner.href} target="_blank">
                      {receivedPlaylist.owner.display_name}
                    </a>
                  </Creator>
                  <TracksCount>
                    {receivedPlaylist.tracks.items.length} tracks
                  </TracksCount>
                </>
              ) : (
                <Vibes features={features} />
              )}
            </Metadata>
          </ContentCard>
          <BackgroundSheet>
            <p
              css={css`
                margin-left: 1rem;
              `}
            >
              {sender ? sender.display_name : "anon"} sent you a playlist:
            </p>
            <PlaylistTracks playlist={receivedPlaylist} />
          </BackgroundSheet>
        </Container>
      ) : (
        <Container>
          <ContentCard>
            <CoverArt isLoading src="https://via.placeholder.com/160" />
            <Metadata>
              <Copy>
                <PlaylistName>Loading...</PlaylistName>
                <Description>your new playlist...</Description>
              </Copy>
            </Metadata>
          </ContentCard>
        </Container>
      )}
    </div>
  );
};

const Container = styled.div`
  margin-top: 1rem;
`;

const PlaylistName = styled.h3`
  padding: 0;
  margin: 0;
  display: flex;
`;

const Description = styled.p`
  margin: 0 0 0.5rem 0;
`;

const Metadata = styled.div`
  display: flex;
  flex-direction: column;
`;

const CoverArt = styled.img<{ isLoading: boolean }>`
  height: 160px;
  width: 160px;
  border-radius: 8px;
  align-self: center;
  margin-right: 1rem;
  background: ${GRAY};
`;

const TracksCount = styled.p`
  margin: 0;
  color: rgb(179, 179, 179);
  font-size: 12px;
`;
const Toggler = styled(SecretlyButton)`
  margin-bottom: 0;
  cursor: pointer;
`;

const Copy = styled.div`
  margin: 0 0 auto 0;
`;

const Favorite = styled(SecretlyButton)`
  display: inline;
  margin-left: 1rem;
`;
