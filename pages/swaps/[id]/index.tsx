import styled from "@emotion/styled";
import { SwapManager } from "../../../components/SwapManager";
import { useEffect } from "react";
import Members from "../../../components/swaps/Members";
import Settings from "../../../components/swaps/Settings";
import PlaylistEntry from "../../../components/swaps/PlaylistEntry";
import { useRouter } from "next/router";
import { useSwap } from "../../../lib/hooks";
import { ReceivedPlaylist } from "../../../components/swaps/Received";
import { useSwapDispatch, useSwapState } from "../../../contexts/swap-context";
import {
  DARK_BLUE,
  DARK_GREEN,
  LIGHT_BLUE,
  LIGHT_GREEN,
  SEPIA,
  WHITE,
} from "../../../shared/styles";

export default function () {
  const router = useRouter();
  const data = useSwap(router.query.id);
  const dispatch = useSwapDispatch();
  const swapState = useSwapState();
  const { swap, activeTab } = swapState;
  useEffect(() => {
    if (data && data.swap && !swap) {
      dispatch({ type: "SWAP_RECEIVED", ...data });
    }
  }, [data.swap, swap]);
  if (!data || !swap) {
    return (
      <div>
        <Title>Loading ...</Title>
      </div>
    );
  }
  return (
    <div>
      <Title>
        <span>{swap.title}</span>
      </Title>
      <Owner>By {swap.owner_display_name}</Owner>
      <Description>{swap.description}</Description>
      <PlaylistEntry />
    </div>
  );
}

const Title = styled.h1`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.5rem;
`;
const Description = styled.p`
  margin: 0;
`;

const EnrollmentStatus = styled.p`
  color: #009688;
  font-style: italic;
  display: inline-block;
  margin-bottom: 0;
`;

const Owner = styled.p`
  color: #009688;
  font-style: italic;
  display: inline-block;
  padding: 0;
  font-size: 1rem;
  margin: 0 0 1rem 0;
`;

const ParticipationBadge = styled.p`
  color: #009688;
  background-color: ${LIGHT_GREEN};
  display: inline-block;
  border-radius: 0.5rem;
  padding: 0.5rem;
  font-size: 1rem;
  margin: 0;
`;

const Tabs = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  border-bottom: 1px solid ${WHITE};
`;

const Tab = styled.li`
  margin: 0 1rem 0 0;
  border-radius: 0.5rem 0.5rem 0 0;
  &:last-of-type {
    margin: 0;
  }
`;

const Button = styled.button<{ isActive: boolean }>`
  color: ${WHITE};
  background-color: ${({ isActive }) => (isActive ? DARK_BLUE : LIGHT_BLUE)};
  border-radius: 0.5rem 0.5rem 0 0;
`;
