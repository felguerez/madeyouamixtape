import { Swap } from "../lib/models/swap";
import styled from "@emotion/styled";
import Link from "next/link";
import { GRAY, DARK_GREEN, OFF_WHITE } from "../shared/styles";

export const SwapList = ({
  swaps,
}: {
  swaps: (Swap & { owner_display_name: string; swap_member_count: number })[];
}) => {
  return swaps.length ? (
    <SwapCards>
      <SwapTitle>
        The following {swaps.length} swap{" "}
        {swaps.length > 1 ? "groups" : "group"} are happening right now:
      </SwapTitle>
      {swaps.map(
        ({ id, title, description, owner_display_name, swap_member_count }) => (
          <SwapCard key={id}>
            <Title>
              <Link as={`/swaps/${id}`} href="/swaps/[id]">
                <a>{title}</a>
              </Link>
            </Title>
            <Description>{description}</Description>
            <OwnerLabel>by {owner_display_name}</OwnerLabel>
            {swap_member_count > 1 && <p>{swap_member_count} members</p>}
          </SwapCard>
        )
      )}
    </SwapCards>
  ) : (
    <div>
      <p>You aren't participating in any swaps. </p>
    </div>
  );
};

const SwapTitle = styled.h4`
  margin-top: 0;
`;

const SwapCards = styled.div`
  background-color: ${OFF_WHITE};
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 2px -2px rgba(0, 0, 0, 0.2);
  border: 1px solid ${GRAY};
`;

const SwapCard = styled.div`
  background: ${GRAY};
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

const Description = styled.span`
  color: ${DARK_GREEN};
`;

const OwnerLabel = styled.p`
  margin: 0;
`;
