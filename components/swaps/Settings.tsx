import styled from "@emotion/styled";
import { Swap } from "../../lib/models/swap";
import Form from "../settings/form";
import { useState } from "react";
import { ButtonLink } from "../SwapManager";
import { Notification } from "../Notification";

const Settings = ({ swap }: { swap: Swap }) => {
  const [notification, setNotification] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [error, setError] = useState("");
  async function handleSubmit(e) {
    event.preventDefault();

    if (error) setError("");

    const body = {
      title: e.currentTarget.title.value,
      description: e.currentTarget.description.value,
    };

    try {
      const res = await fetch(`/api/swaps/${swap.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        setIsFormOpen((isFormOpen) => !isFormOpen);
        setNotification("updated swap information");
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error("An unexpected error happened occurred:", error);
      setError(error.message);
    }
  }
  return (
    <BodyContent>
      <h2>Settings</h2>
      {notification && (
        <Notification
          notification={notification}
          setNotification={setNotification}
        />
      )}
      <p>
        Manage your playlist swap's title and description{" "}
        <ButtonLink onClick={() => setIsFormOpen((isFormOpen) => !isFormOpen)}>
          here
        </ButtonLink>
        .
      </p>
      {isFormOpen && (
        <Form
          onSubmit={handleSubmit}
          errorMessage={error}
          initialValues={{ title: swap.title, description: swap.description }}
        />
      )}
      <h3>Complete the swap & shuffle playlists</h3>
      <p>
        When the group is ready, you can shuffle and distribute playlists here,
        too. Each member will have the option to subscribe to their new
        playlist.
      </p>
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
        Shuffle 'em
      </button>
      <p>
        Share this link with others to have them join your group:{" "}
        <a href={`/swaps/${swap.id}/join`}>link</a>
      </p>
    </BodyContent>
  );
};

export default Settings;

const BodyContent = styled.div`
  padding: 2rem 0;
`;
