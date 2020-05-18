import { useSwaps } from "../lib/hooks";
import { SwapList } from "./SwapList";
import { ButtonLink } from "./SwapManager";
import { useState } from "react";
import Form from "./home/form";
import { User } from "../lib/models/user";
import Router from "next/router";
import { Button, CopyContainer } from "../shared/styles";
import styled from "@emotion/styled";

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
      <h1>Made You A Mixtape</h1>
      <p>
        Share some music with people you know or random strangers. Join an
        existing playlist exchange group below or start your own.
      </p>
      <NewSwapContainer>
        <Button onClick={() => setIsOpen((isOpen) => !isOpen)}>
          <SwapIcon className="material-icons">swap_horizontal_circle</SwapIcon>
          <span>Start a new swap</span>
        </Button>
        {isOpen && (
          <Form
            errorMessage={error}
            onSubmit={handleSubmit}
            spotifyId={user.spotify_id}
          />
        )}
      </NewSwapContainer>
      {swaps ? <SwapList swaps={swaps} /> : <p>Loading...</p>}
    </>
  );
};

const SwapIcon = styled.i`
  margin-right: 1rem;
`;

const NewSwapContainer = styled.div`
  margin-bottom: 1rem;
`;

export default Swaps;
