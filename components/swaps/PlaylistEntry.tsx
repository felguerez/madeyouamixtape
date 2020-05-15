import { Playlists } from "../Playlists";
import { SelectedPlaylist } from "./SelectedPlaylist";
import styled from "@emotion/styled";
import { useSwapDispatch, useSwapState } from "../../contexts/swap-context";
import { DARK_BLUE, GRAY } from "../../shared/styles";
import Members from "./Members";
import { ReceivedPlaylist } from "./Received";

const PlaylistEntry = ({ swap, currentSwapMember }) => {
  const { playlistViewer } = useSwapState();
  const dispatch = useSwapDispatch();
  return (
    <div>
      <Tabs>
        <Tab>
          <Button
            onClick={() =>
              dispatch({
                type: "SET_PLAYLIST_VIEWER",
                playlistViewer: "members",
              })
            }
            isActive={playlistViewer === "members"}
          >
            Members
          </Button>
        </Tab>
        <Tab>
          <Button
            onClick={() =>
              dispatch({
                type: "SET_PLAYLIST_VIEWER",
                playlistViewer: "selection",
              })
            }
            isActive={playlistViewer === "selection"}
          >
            Selected playlist
          </Button>
        </Tab>
        {currentSwapMember.received_playlist_id && (
          <Tab>
            <Button
              onClick={() =>
                dispatch({
                  type: "SET_PLAYLIST_VIEWER",
                  playlistViewer: "received",
                })
              }
              isActive={playlistViewer === "received"}
            >
              Your New Playlist
            </Button>
          </Tab>
        )}
      </Tabs>
      {playlistViewer === "members" && <Members swap={swap} />}
      {currentSwapMember && (
        <>
          {playlistViewer === "selection" && (
            <SelectedPlaylist currentSwapMember={currentSwapMember} />
          )}
          {playlistViewer === "received" &&
            currentSwapMember.received_playlist_id && (
              <ReceivedPlaylist
                swap={swap}
                currentSwapMember={currentSwapMember}
              />
            )}
          {playlistViewer === "selector" && (
            <Playlists currentSwapMember={currentSwapMember} />
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
  background-color: ${({ isActive }) => (isActive ? GRAY : "unset")};
  box-shadow: ${({ isActive }) =>
    isActive ? "0 2px 2px -2px rgba(0,0,0,.2)" : null};
`;

export default PlaylistEntry;
