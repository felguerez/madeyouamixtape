import fetch from "isomorphic-fetch";
import { useEffect, useState } from "react";
import { useUser } from "../../lib/hooks";
import styled from "@emotion/styled";
import { ButtonLink } from "../SwapManager";
import { css } from "@emotion/core";
import { useSwapDispatch, useSwapState } from "../../contexts/swap-context";
import { Notification } from "../Notification";
import { GRAY } from "../../shared/styles";
import PlaylistTracks from "../../pages/swaps/[id]/PlaylistTracks";

export const ReceivedPlaylist = ({
  swap,
  currentSwapMember: { received_playlist_id },
}) => {
  const user = useUser();
  const [notification, setNotification] = useState("");
  const dispatch = useSwapDispatch();
  const { receivedPlaylist } = useSwapState();
  useEffect(() => {
    async function fetchData() {
      const request = await fetch(
        `/api/spotify/playlists/${received_playlist_id}`
      ).catch((err) => {
        console.log("err:", err);
      });
      const playlist = await request.json();
      dispatch({ type: "SET_RECEIVED_PLAYLIST", playlist });
    }
    if (received_playlist_id) {
      fetchData().catch((err) => {
        console.log("err:", err);
      });
    }
  }, [received_playlist_id]);

  const onFollow = async () => {
    const request = await fetch(
      `/api/spotify/playlists/${received_playlist_id}/follow`
    ).catch((err) => {
      console.log("err:", err);
    });
    if (request.ok) {
      setNotification("You're subscribed! Check your Library in Spotify");
    }
  };
  const sender = swap.members.filter(
    (member) => member.selected_playlist_id === received_playlist_id
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
              <PlaylistName>{receivedPlaylist.name}</PlaylistName>
              <TrackLength>
                {receivedPlaylist.tracks.items.length} tracks
              </TrackLength>
              <Description
                dangerouslySetInnerHTML={{
                  __html: receivedPlaylist.description,
                }}
              />
              <Creator>
                by{" "}
                <a href={receivedPlaylist.owner.href} target="_blank">
                  {receivedPlaylist.owner.display_name}
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
