import { useUser } from "../lib/hooks";
import { Welcome } from "../components/home/Welcome";
import Swaps from "../components/Swaps";
import { CopyContainer } from "../shared/styles";

const Home = () => {
  const { user } = useUser();
  if (user === undefined) {
    return (
      <CopyContainer>
        <h1>Loading...</h1>
      </CopyContainer>
    );
  }
  if (user === null) return <Welcome />;
  return <Swaps user={user} />;
};

export default Home;
