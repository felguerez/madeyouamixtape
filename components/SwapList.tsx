import { Swap } from "../lib/models/swap";

export const SwapList = ({
  swaps,
}: {
  swaps: (Swap & { id: number; owner_display_name: string })[];
}) => {
  return swaps.length ? (
    <div>
      {swaps.map((swap) => (
        <p key={swap.id}>
          <a href={`/swaps/${swap.id}`}>{swap.title}</a> by{" "}
          {swap.owner_display_name}
        </p>
      ))}
    </div>
  ) : (
    <div>
      <p>You aren't participating in any swaps. </p>
    </div>
  );
};
