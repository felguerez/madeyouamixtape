import { Playlists } from "../Playlists";
import { SelectedPlaylist } from "./SelectedPlaylist";
import styled from "@emotion/styled";
import { useSwapDispatch, useSwapState } from "../../contexts/swap-context";
import {DARK_BLUE, DARK_GRAY, GRAY, LIGHT_BLUE, SEPIA, WHITE} from "../../shared/styles";

const PlaylistEntry = () => {
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
                playlistViewer: "selection",
              })
            }
            isActive={playlistViewer === "selection"}
          >
            Selected playlist
          </Button>
        </Tab>
        <Tab>
          <Button
            onClick={() =>
              dispatch({
                type: "SET_PLAYLIST_VIEWER",
                playlistViewer: "selector",
              })
            }
            isActive={playlistViewer === "selector"}
          >
            Choose a playlist
          </Button>
        </Tab>
      </Tabs>
      {playlistViewer === "selection" && <SelectedPlaylist />}
      {playlistViewer === "selector" && <Playlists />}
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
  &:last-of-type {
    margin-right: 0;
  }
`;

const Button = styled.button<{ isActive: boolean }>`
  padding: 1rem;
  color: ${DARK_BLUE};
  font-weight: bold;
  background-color: ${({ isActive }) => (isActive ? DARK_GRAY : "unset")};
  box-shadow: ${({ isActive }) =>
    isActive ? "0 2px 2px -2px rgba(0,0,0,.2)" : null};
`;

export default PlaylistEntry;
