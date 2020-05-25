import { useUser } from "../lib/hooks";
import { Welcome } from "../components/home/Welcome";
import { CopyContainer } from "../shared/styles";
import { getSession } from "../lib/iron";

const Home = () => <Welcome />;

export async function getServerSideProps({ req, res }) {
  const user = await getSession(req);
  if (user) {
    res.writeHead(302, {
      Location: "/swaps",
    });
    res.end();
  }
  return {
    props: {
      user,
    },
  };
}
export default Home;
