import { Swap } from "../lib/models/swap";
import styled from "@emotion/styled";
import Link from "next/link";
import {
  GRAY,
  DARK_GREEN,
  OFF_WHITE,
  lightLinearGradient,
  WHITE,
} from "../shared/styles";
import { css } from "@emotion/core";

export const SwapList = ({
  swaps,
}: {
  swaps: (Swap & { owner_display_name: string; swap_member_count: number })[];
}) => {
  return swaps.length ? (
    <SwapCards>
      {swaps.map(
        ({ id, title, description, owner_display_name, swap_member_count }) => (
          <SwapCard key={id}>
            <PrimaryInformation>
              <Title>
                <Link as={`/swaps/${id}`} href="/swaps/[id]">
                  <a>{title}</a>
                </Link>
              </Title>
              <Description>{description}</Description>
            </PrimaryInformation>
            <AdditionalInformation>
              <OwnerLabel>by {owner_display_name}</OwnerLabel>
              <span
                css={css`
                  margin: 0 0.5rem;
                `}
              >
                {" "}
                &bull;{" "}
              </span>
              {swap_member_count > 1 && <p>{swap_member_count} members</p>}
            </AdditionalInformation>
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

const SwapCards = styled.div`
  background-color: ${OFF_WHITE};
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
`;

const SwapCard = styled.div`
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
  background: ${WHITE};
  padding: 0;
  border-radius: 0.5rem;
  margin-bottom: 2rem;
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
  //margin: 0;
`;

const PrimaryInformation = styled.div`
  padding: 2rem;
`;

const AdditionalInformation = styled.div`
  background: ${GRAY};
  padding: 0 2rem;
  display: flex;
  align-items: center;
  p {
    margin: 0.5rem 0;
  }
`;
