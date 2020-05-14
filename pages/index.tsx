import { useUser } from "../lib/hooks";
import { Welcome } from "../components/home/Welcome";
import Swaps from "../components/swaps";

const Home = () => {
  const identity = useUser();
  if (!identity.user) return <Welcome />;
  return <Swaps user={identity.user} />;
};

export default Home;
