import styled from "@emotion/styled";
import { Swap } from "../../lib/models/swap";
import { useState } from "react";

const Settings = ({ swap }: { swap: Swap }) => {
  const [notification, setNotification] = useState("");
  return (
    <BodyContent>
      {notification && <p>{notification}</p>}
      <h2>Settings</h2>
      <p>Manage your playlist swap's title and description here.</p>
      <h3>Complete the swap & shuffle playlists</h3>
      <p>
        When the group is ready, you can shuffle and distribute playlists here,
        too. Each member will have the option to subscribe to their new
        playlist.
      </p>
      <h4>
        <button
          onClick={async (e) => {
            const shuffle = await fetch(`/api/swaps/${swap.id}/`, {
              method: "POST",
            });
            if (shuffle.ok) {
              setNotification("all clear! check out your new playlist!");
            }
          }}
        >
          Complete & Shuffle
        </button>
      </h4>
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
