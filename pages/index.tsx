import { useUser } from "../lib/hooks";
import { ButtonLink, SwapManager } from "../components/SwapManager";
import { Welcome } from "../components/home/Welcome";
import Link from "next/link";
import Form from "../components/home/form";
import { useState } from "react";
import Router from "next/router";

const Home = () => {
  const identity = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  if (!identity.user) return <Welcome />;
  const { user, spotifyUser } = identity;
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
      <p>Hello, {spotifyUser.display_name}!</p>
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
        <>
          <div className="login">
            <Form errorMessage={error} onSubmit={handleSubmit} />
          </div>
          <style jsx>{`
            .login {
              max-width: 21rem;
              padding: 1rem;
              border: 1px solid #ccc;
              border-radius: 4px;
            }
          `}</style>
        </>
      )}
    </>
  );
};

export default Home;
