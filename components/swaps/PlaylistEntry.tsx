import { Playlists } from "../Playlists";
import { SelectedPlaylist } from "./SelectedPlaylist";
import styled from "@emotion/styled";
import { useSwapDispatch, useSwapState } from "../../contexts/swap-context";

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
  padding: 0;
  background-color: rgba(19, 28, 31, 1);
  font-weight: bold;
  color: ${({ isActive }) => (isActive ? "#ffffff" : "#B0BEC5")};
`;

export default PlaylistEntry;
