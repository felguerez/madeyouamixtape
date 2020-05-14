import { Swap } from "../lib/models/swap";
import styled from "@emotion/styled";
import Link from "next/link";
import { DARK_GRAY, GRAY } from "../shared/styles";

export const SwapList = ({
  swaps,
}: {
  swaps: (Swap & { owner_display_name: string; swap_member_count: number })[];
}) => {
  return swaps.length ? (
    <div>
      <SwapCards>
        {swaps.map(({ id, title, owner_display_name, swap_member_count }) => (
          <SwapCard key={id}>
            <Title>
              <Link href={`/swaps/${id}`}>
                <a>{title}</a>
              </Link>
            </Title>
            <OwnerLabel>by {owner_display_name}</OwnerLabel>
            {swap_member_count > 1 && <p>{swap_member_count} members</p>}
          </SwapCard>
        ))}
      </SwapCards>
    </div>
  ) : (
    <div>
      <p>You aren't participating in any swaps. </p>
    </div>
  );
};

const SwapCards = styled.div`
  background-color: ${GRAY};
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 2px -2px rgba(0, 0, 0, 0.2);
  border: 1px solid ${DARK_GRAY};
`;

const SwapCard = styled.div`
  background: ${DARK_GRAY};
  box-shadow: 0 2px 2px -2px rgba(0, 0, 0, 0.2);
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
