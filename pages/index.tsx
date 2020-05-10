import { useUser } from "../lib/hooks";
import { SwapCreator } from "../components/SwapCreator";
import { Welcome } from "../components/home/Welcome";

const Home = () => {
  const identity = useUser();
  if (!identity.user) return <Welcome />;
  const { user, spotifyUser } = identity;
  return (
    <>
      <h1>Made You A Mixtape</h1>
      <p>Hello, {spotifyUser.display_name}</p>
      <SwapCreator spotify_id={user.spotify_id}>
        Start a new playlist swap.
      </SwapCreator>
    </>
  );
};

export default Home;
