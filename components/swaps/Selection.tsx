import { Playlists } from "../Playlists";
import { SwapMember } from "../../lib/models/swapMember";
import { useState } from "react";
import { SelectedPlaylist } from "./SelectedPlaylist";
import styled from "@emotion/styled";

const Selection = ({
  isEnrolled,
  swapMember,
}: {
  isEnrolled: boolean;
  swapMember: SwapMember;
}) => {
  const [activeTab, setActiveTab] = useState("selected");
  return (
    <div>
      <Tabs>
        <Tab>
          <Button
            onClick={() => setActiveTab("selected")}
            isActive={activeTab === "selected"}
          >
            Selected playlist
          </Button>
        </Tab>
        <Tab>
          <Button
            onClick={() => setActiveTab("playlists")}
            isActive={activeTab === "playlists"}
          >
            Choose a playlist
          </Button>
        </Tab>
      </Tabs>
      {activeTab === "selected" && <SelectedPlaylist />}
      {activeTab === "playlists" && (
        <Playlists isEnrolled={isEnrolled} swapMember={swapMember} />
      )}
    </div>
  );
};

const Tabs = styled.ul`
  list-style: none;
  display: flex;
  padding-left: 2rem;
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

export default Selection;
