import { CurrentUsersPlaylists } from "../CurrentUsersPlaylists";
import { SelectedPlaylist } from "./SelectedPlaylist";
import styled from "@emotion/styled";
import { useSwapDispatch, useSwapState } from "../../contexts/swap-context";
import { DARK_BLUE, DARK_GRAY, GRAY } from "../../shared/styles";
import Members from "./Members";
import { ReceivedPlaylist } from "./Received";

const PlaylistEntry = ({ swap, currentSwapMember }) => {
  const { activeTab } = useSwapState();
  const dispatch = useSwapDispatch();
  return (
    <div>
      <Tabs>
        <Tab>
          <Button
            onClick={() =>
              dispatch({
                type: "SET_ACTIVE_TAB",
                activeTab: "members",
              })
            }
            isActive={activeTab === "members"}
          >
            Members
          </Button>
        </Tab>
        <Tab>
          <Button
            onClick={() =>
              dispatch({
                type: "SET_ACTIVE_TAB",
                activeTab: "selection",
              })
            }
            isActive={activeTab === "selection"}
          >
            Selected playlist
          </Button>
        </Tab>
        {currentSwapMember.received_playlist_id && (
          <Tab>
            <Button
              onClick={() =>
                dispatch({
                  type: "SET_ACTIVE_TAB",
                  activeTab: "received",
                })
              }
              isActive={activeTab === "received"}
            >
              Your New Playlist
            </Button>
          </Tab>
        )}
      </Tabs>
      {activeTab === "members" && <Members swap={swap} />}
      {currentSwapMember && (
        <>
          {activeTab === "selection" && (
            <SelectedPlaylist currentSwapMember={currentSwapMember} />
          )}
          {activeTab === "received" &&
            currentSwapMember.received_playlist_id && (
              <ReceivedPlaylist
                swap={swap}
                currentSwapMember={currentSwapMember}
              />
            )}
          {activeTab === "selector" && (
            <CurrentUsersPlaylists currentSwapMember={currentSwapMember} />
          )}
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
