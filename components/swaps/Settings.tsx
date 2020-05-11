import styled from "@emotion/styled";
import { Swap } from "../../lib/models/swap";

const Settings = ({ swap }: { swap: Swap }) => {
  return (
    <BodyContent>
      <h2>Settings</h2>
      <p>Manage your playlist swap's title and description here.</p>
      <p>
        When the group is ready, you can shuffle and distribute playlists here,
        too.
      </p>
      <p>
        Share this link with others to have them join your group:{" "}
        <a href={`/swaps/${swap.id}/join`}>link</a>
      </p>
    </BodyContent>
  );
};

export default Settings;

const BodyContent = styled.div`
  padding: 2rem;
`;
