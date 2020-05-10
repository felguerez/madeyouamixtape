import { useSwaps } from "../lib/hooks";

const Swaps = () => {
  const swaps = useSwaps() || [];
  if (!swaps) return <p>Loading...</p>;
  return (
    <>
      <h1>Playlist Swaps</h1>
      <p>Share some music with people you know or random strangers.</p>
      {swaps.length ? (
        <div>
          {swaps.map((swap) => (
            <p key={swap.id}>
              <a href={`/swaps/${swap.id}`}>{swap.title}</a> by{" "}
              {swap.display_name}
            </p>
          ))}
        </div>
      ) : (
        <div>
          <p>You aren't participating in any swaps. </p>
        </div>
      )}
    </>
  );
};

export default Swaps;
