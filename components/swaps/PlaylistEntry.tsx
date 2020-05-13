import { Playlists } from "../Playlists";
import { SwapMember } from "../../lib/models/swapMember";
import { Dispatch, useEffect, useState } from "react";
import { SelectedPlaylist } from "./SelectedPlaylist";
import styled from "@emotion/styled";

const PlaylistEntry = ({
  isEnrolled,
  swapMember,
  dispatch,
  playlistViewer,
  playlists,
}: {
  isEnrolled: boolean;
  swapMember: SwapMember;
  dispatch: Dispatch<any>;
  playlistViewer: "selected" | "selector";
  playlists: any;
}) => {
  const [selectedId, setSelectedId] = useState("");
  useEffect(() => {
    if (swapMember.selected_playlist_id) {
      setSelectedId(swapMember.selected_playlist_id);
    }
  }, [swapMember]);
  return (
    <div>
      <Tabs>
        <Tab>
          <Button
            onClick={() =>
              dispatch({
                type: "SET_PLAYLIST_VIEWER",
                playlistViewer: "selected",
              })
            }
            isActive={playlistViewer === "selected"}
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
      {playlistViewer === "selected" && (
        <SelectedPlaylist selectedId={selectedId} />
      )}
      {playlistViewer === "selector" && (
        <Playlists
          dispatch={dispatch}
          isEnrolled={isEnrolled}
          swapMember={swapMember}
          playlists={playlists}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />
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
