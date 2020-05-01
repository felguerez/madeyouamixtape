import { useUser } from "../lib/hooks";
import Layout from "../components/layout";

const Home = () => {
  const user = useUser();

  return (
    <Layout>
      <h1>Made You A Mixtape</h1>
      {user && <p>Currently logged in as: {JSON.stringify(user)}</p>}
    </Layout>
  );
};

export default Home;
