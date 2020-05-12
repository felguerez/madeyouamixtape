import { useUser } from "../lib/hooks";
import { SwapManager } from "../components/SwapManager";
import { Welcome } from "../components/home/Welcome";
import Link from "next/link";

const Home = () => {
  const identity = useUser();
  if (!identity.user) return <Welcome />;
  const { user, spotifyUser } = identity;
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
        <SwapManager spotify_id={user.spotify_id} user_id={user.id}>
          start a new playlist swap.
        </SwapManager>
      </p>
    </>
  );
};

export default Home;
