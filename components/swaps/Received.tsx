import fetch from "isomorphic-fetch";
import { useEffect, useState } from "react";
import { useFeatures, useUser } from "../../lib/hooks";
import styled from "@emotion/styled";
import { ButtonLink } from "../SwapManager";
import { css } from "@emotion/core";
import { useSwapDispatch, useSwapState } from "../../contexts/swap-context";
import { Notification } from "../Notification";
import { GRAY } from "../../shared/styles";
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
      <Title>
        {!user ? "Loading your account ..." : `You've received a new playlist!`}
      </Title>
      {notification && (
        <Notification
          notification={notification}
          setNotification={setNotification}
        />
      )}
      <p>{sender ? sender.display_name : "anon"} sent you a playlist:</p>
      {receivedPlaylist && (
        <Container>
          <PlaylistCard>
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
                <Description
                  dangerouslySetInnerHTML={{
                    __html: receivedPlaylist.description,
                  }}
                />
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
          </PlaylistCard>
          <PlaylistTracks playlist={receivedPlaylist} />
        </Container>
      )}
    </div>
  );
};

const Title = styled.h2`
  padding: 0;
`;

const Container = styled.div`
  margin-top: 1rem;
`;

const PlaylistCard = styled.div`
  background: ${GRAY};
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  box-shadow: 0 2px 2px -2px rgba(0, 0, 0, 0.2);
`;

const PlaylistName = styled.h3`
  padding: 0;
  margin: 0;
  display: flex;
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

const TracksCount = styled.p`
  margin: 0;
  color: rgb(179, 179, 179);
  font-size: 12px;
`;
const Toggler = styled(ButtonLink)`
  margin-bottom: 0;
  cursor: pointer;
`;

const Copy = styled.div`
  margin: 0 0 auto 0;
`;

const Favorite = styled(ButtonLink)`
  display: inline;
  margin-left: 1rem;
`;
