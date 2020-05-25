import { CurrentUsersPlaylists } from "../CurrentUsersPlaylists";
import { SelectedPlaylist } from "./SelectedPlaylist";
import styled from "@emotion/styled";
import { useSwapDispatch, useSwapState } from "../../contexts/swap-context";
import { DARK_BLUE, DARK_GRAY, GRAY } from "../../shared/styles";
import Members from "./Members";
import { ReceivedPlaylist } from "./Received";
import Settings from "./Settings";
import Router, { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useEffect } from "react";

const PlaylistEntry = ({ swap, currentSwapMember }) => {
  const { activeTab, receivedPlaylistId } = useSwapState();
  const dispatch = useSwapDispatch();
  const router = useRouter();
  const {
    query: { id, tab },
  }: { query: ParsedUrlQuery } = router;

  useEffect(() => {
    if (!tab) {
      router.replace(`/swaps[id]?tab=members`, `/swaps/${id}?tab=members`, {
        shallow: true,
      });
    }
  }, [tab]);
  return (
    <div>
      <Tabs>
        <Tab>
          <Button
            onClick={() =>
              router.push(
                "/swaps/[id]?tab=members",
                `/swaps/${id}?tab=members`,
                {
                  shallow: true,
                }
              )
            }
            isActive={!tab || tab === "members"}
          >
            Members
          </Button>
        </Tab>
        {currentSwapMember.isEnrolled && (
          <Tab>
            <Button
              onClick={() =>
                router.push(
                  "/swaps/[id]?tab=selection",
                  `/swaps/${id}?tab=selection`,
                  {
                    shallow: true,
                  }
                )
              }
              isActive={tab === "selection"}
            >
              Selected playlist
            </Button>
          </Tab>
        )}
        {currentSwapMember.received_playlist_id && (
          <Tab>
            <Button
              onClick={() =>
                router.push(
                  "/swaps/[id]?tab=received",
                  `/swaps/${id}?tab=received`,
                  {
                    shallow: true,
                  }
                )
              }
              isActive={tab === "received"}
            >
              Your New Playlist
            </Button>
            <Button
              isActive={false}
              onClick={async () => {
                const response = await fetch(
                  `/api/swap_members/${currentSwapMember.id}/update`,
                  {
                    method: "post",
                    body: JSON.stringify({
                      swap_id: swap.id,
                      current_received_playlist_id:
                        receivedPlaylistId ||
                        currentSwapMember.received_playlist_id,
                    }),
                  }
                );
                if (response.ok) {
                  const payload = await response.json();
                  if (payload.receivedPlaylistId) {
                    dispatch({
                      type: "SET_RECEIVED_PLAYLIST_ID",
                      receivedPlaylistId: payload.receivedPlaylistId,
                    });
                  }
                } else {
                  console.log("response:", response);
                }
              }}
            >
              Shuffle
            </Button>
          </Tab>
        )}
        {currentSwapMember.id === swap.owner_id && (
          <Tab>
            <Button
              onClick={() =>
                router.push(
                  "/swaps/[id]?tab=settings",
                  `/swaps/${id}?tab=settings`,
                  {
                    shallow: true,
                  }
                )
              }
              isActive={tab === "settings"}
            >
              Settings
            </Button>
          </Tab>
        )}
      </Tabs>
      {tab === "members" && (
        <Members swap={swap} currentSwapMember={currentSwapMember} />
      )}
      {currentSwapMember && (
        <>
          {tab === "selection" && (
            <SelectedPlaylist currentSwapMember={currentSwapMember} />
          )}
          {tab === "received" && currentSwapMember.received_playlist_id && (
            <ReceivedPlaylist
              swap={swap}
              receivedPlaylistId={
                receivedPlaylistId || currentSwapMember.received_playlist_id
              }
            />
          )}
          {tab === "browser" && (
            <CurrentUsersPlaylists currentSwapMember={currentSwapMember} />
          )}
          {tab === "settings" && <Settings swap={swap} />}
        </>
      )}
    </div>
  );
};

const Tabs = styled.ul`
  list-style: none;
  display: flex;
  padding-left: 0;
  margin: 0;
`;

const Tab = styled.li`
  padding: 0.25rem;
  margin-right: 0.25rem;
  &:first-of-type {
    padding-left: 0;
  }
  &:last-of-type {
    margin-right: 0;
  }
`;

const Button = styled.button<{ isActive: boolean }>`
  padding: 1rem;
  color: ${DARK_BLUE};
  font-weight: bold;
  border-radius: 0;
  background-color: unset;
  border-bottom: ${({ isActive }) => {
    return isActive ? `1px solid ${DARK_BLUE}` : `1px solid ${DARK_GRAY}`;
  }};
  &:first-of-type {
    padding-left: 0;
  }
`;

export default PlaylistEntry;
