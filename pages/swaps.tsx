import { useSwaps } from "../lib/hooks";
import { SwapList } from "../components/SwapList";

const Swaps = () => {
  const swaps = useSwaps();
  return (
    <>
      <h1>Playlist Swaps</h1>
      <p>Share some music with people you know or random strangers.</p>
      {swaps ? <SwapList swaps={swaps} /> : <p>Loading...</p>}
    </>
  );
};

export default Swaps;
