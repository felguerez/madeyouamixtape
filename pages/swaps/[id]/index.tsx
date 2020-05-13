import styled from "@emotion/styled";
import { SwapManager } from "../../../components/SwapManager";
import { useEffect } from "react";
import Members from "../../../components/swaps/Members";
import Settings from "../../../components/swaps/Settings";
import PlaylistEntry from "../../../components/swaps/PlaylistEntry";
import { useRouter } from "next/router";
import { useSwap } from "../../../lib/hooks";
import { ReceivedPlaylist } from "../../../components/swaps/Received";
import { useSwapDispatch, useSwapState } from "../../../contexts/swap-context";

export default function () {
  const router = useRouter();
  const data = useSwap(router.query.id);
  const dispatch = useSwapDispatch();
  const swapState = useSwapState();
  const { swap, currentSwapMember, spotifyId, activeTab } = swapState;
  useEffect(() => {
    if (data && data.swap && !swap) {
      dispatch({ type: "SWAP_RECEIVED", ...data });
    }
  }, [data.swap, swap]);
  if (!data || !swap) {
    return (
      <div>
        <Title>Loading ...</Title>
      </div>
    );
  }
  return (
    <div>
      <Title>
        <span>{swap.title}</span>
        {currentSwapMember.isEnrolled && (
          <ParticipationBadge>Participating</ParticipationBadge>
        )}
      </Title>
      <Owner>By {swap.owner_display_name}</Owner>
      <Description>{swap.description}</Description>
      <Tabs>
        <Tab>
          <Button
            isActive={activeTab === "members"}
            onClick={() =>
              dispatch({ type: "SET_ACTIVE_TAB", activeTab: "members" })
            }
          >
            Swap Group Members
          </Button>
        </Tab>
        {currentSwapMember.isEnrolled && (
          <Tab>
            <Button
              onClick={() =>
                dispatch({ type: "SET_ACTIVE_TAB", activeTab: "entry" })
              }
              isActive={activeTab === "entry"}
            >
              Your Playlist Entry
            </Button>
          </Tab>
        )}
        {currentSwapMember.received_playlist_id && (
          <Tab>
            <Button
              onClick={() =>
                dispatch({ type: "SET_ACTIVE_TAB", activeTab: "received" })
              }
              isActive={activeTab === "received"}
            >
              Your New Playlist
            </Button>
          </Tab>
        )}
        {currentSwapMember.isOwner && (
          <Tab>
            <Button
              onClick={() =>
                dispatch({ type: "SET_ACTIVE_TAB", activeTab: "settings" })
              }
              isActive={activeTab === "settings"}
            >
              Settings
            </Button>
          </Tab>
        )}
      </Tabs>
      {!currentSwapMember.isEnrolled && (
        <EnrollmentStatus>
          You aren't participating yet.{" "}
          <SwapManager
            id={swap.id}
            action="join"
            spotify_id={spotifyId}
            user_id={currentSwapMember.user_id}
          >
            Join this swap
          </SwapManager>
        </EnrollmentStatus>
      )}
      {activeTab === "members" && <Members swap={swap} />}
      {activeTab === "entry" && <PlaylistEntry />}
      {activeTab === "received" && <ReceivedPlaylist />}
      {activeTab === "settings" && <Settings swap={swap} />}
    </div>
  );
}

const Title = styled.h1`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;
const Description = styled.p`
  margin: 0;
`;

const EnrollmentStatus = styled.p`
  color: #009688;
  font-style: italic;
  display: inline-block;
  margin-bottom: 0;
`;

const Owner = styled.p`
  color: #009688;
  font-style: italic;
  display: inline-block;
  padding: 0;
  font-size: 1rem;
  margin: 0 0 1rem 0;
`;

const ParticipationBadge = styled.p`
  color: #009688;
  background-color: #2e3c43;
  display: inline-block;
  border-radius: 0.5rem;
  padding: 0.5rem;
  font-size: 1rem;
  margin: 0;
`;

const Tabs = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  border-bottom: 1px dotted #2e3c43;
`;

const Tab = styled.li`
  margin: 0 1rem 0 0;
  background-color: #2e3c43;
  color: #b0bec5;
  border-radius: 0.5rem 0.5rem 0 0;
  &:last-of-type {
    margin: 0;
  }
`;

const Button = styled.button<{ isActive: boolean }>`
  background-color: ${({ isActive }) => (isActive ? "#546E7A" : "#2e3c43")};
  border-radius: 0.5rem 0.5rem 0 0;
`;
