import { useSwaps } from "../lib/hooks";
import { SwapList } from "./SwapList";
import { ButtonLink } from "./SwapManager";
import { useState } from "react";
import Form from "./home/form";
import { User } from "../lib/models/user";
import Router from "next/router";
import { CopyContainer } from "../shared/styles";

const Swaps = ({ user }: { user: User }) => {
  const swaps = useSwaps();
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  async function handleSubmit(e) {
    event.preventDefault();

    if (error) setError("");

    const body = {
      spotify_id: e.currentTarget.spotify_id.value,
      title: e.currentTarget.title.value,
      description: e.currentTarget.description.value,
    };

    try {
      const res = await fetch(`/api/users/${user.id}/swaps`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        Router.push("/");
        setIsOpen(false);
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error("An unexpected error happened occurred:", error);
      setError(error.message);
    }
  }
  return (
    <>
      <CopyContainer>
        <h1>Made You A Mixtape</h1>
        <p>
          Hey welcome back. Check out a group below and join to share playlists.
          Share some music with people you know or random strangers.
        </p>
        <p>
          If you want to start a new swap group feel free.{" "}
          <ButtonLink onClick={() => setIsOpen((isOpen) => !isOpen)}>
            Click here
          </ButtonLink>{" "}
          and give your swap group a name and a short description.
        </p>
        {isOpen && (
          <Form
            errorMessage={error}
            onSubmit={handleSubmit}
            spotifyId={user.spotify_id}
          />
        )}
        {swaps && (
          <p>
            The following {swaps.length} swap{" "}
            {swaps.length > 1 ? "groups" : "group"} are happening right now:
          </p>
        )}
      </CopyContainer>
      {swaps ? (
        <SwapList swaps={swaps} />
      ) : (
        <CopyContainer>
          <p>Loading...</p>
        </CopyContainer>
      )}
    </>
  );
};

export default Swaps;
