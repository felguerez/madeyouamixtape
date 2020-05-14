import Link from "next/link";
import { ButtonLink } from "../components/SwapManager";
import Form from "../components/home/form";
import { useUser } from "../lib/hooks";
import { useState } from "react";
import Router from "next/router";

const About = () => {
  const identity = useUser();
  const user = identity.user || {};
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
      <p>Hello{user.display_name && `, ${user.display_name}`}!</p>
      <p>
        Welcome to Made You A Mixtape. Join a group and select a playlist you
        wanna share. You'll receive someone else's playlist, selected randomly,
        once everyone chooses their mix.
      </p>
      <p>
        You can see all of the{" "}
        <Link href="/swaps">
          <a>playlist swaps</a>
        </Link>{" "}
        happening right now or you can{" "}
        <ButtonLink onClick={() => setIsOpen((isOpen) => !isOpen)}>
          start a new playlist swap.
        </ButtonLink>
      </p>
      {isOpen && (
        <Form
          errorMessage={error}
          onSubmit={handleSubmit}
          spotifyId={user.spotify_id}
        />
      )}
    </>
  );
};

export default About;
