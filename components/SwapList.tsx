import { Swap } from "../lib/models/swap";
import styled from "@emotion/styled";

export const SwapList = ({
  swaps,
}: {
  swaps: (Swap & { owner_display_name: string; swap_member_count: number })[];
}) => {
  return swaps.length ? (
    <div>
      <p>
        The following {swaps.length} swap{" "}
        {swaps.length > 1 ? "groups" : "group"} are happening right now:
      </p>
      {swaps.map(({ id, title, owner_display_name, swap_member_count }) => (
        <SwapCard key={id}>
          <Title>
            <a href={`/swaps/${id}`}>{title}</a>
          </Title>
          <OwnerLabel>by {owner_display_name}</OwnerLabel>
          {swap_member_count > 1 && <p>{swap_member_count} members</p>}
        </SwapCard>
      ))}
    </div>
  ) : (
    <div>
      <p>You aren't participating in any swaps. </p>
    </div>
  );
};

const SwapCard = styled.div`
  background: #282828;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  &:last-of-type {
    margin-bottom: 0;
  }
`;

const Title = styled.h2`
  margin: 0;
`;

const OwnerLabel = styled.p`
  margin: 0;
`;
