import styled from "@emotion/styled";
import { SwapManager } from "../../../components/SwapManager";
import { useState } from "react";
import Members from "../../../components/swaps/Members";
import Settings from "../../../components/swaps/Settings";
import Selection from "../../../components/swaps/Selection";
import { useRouter } from "next/router";
import { useSwap } from "../../../lib/hooks";

export default function () {
  const [activeTab, setActiveTab] = useState("members");
  const router = useRouter();
  const data = useSwap(router.query.id);
  const { swap, currentSwapMember, spotifyId } = data;
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
        {currentSwapMember.isEnrolled && (
          <ParticipationBadge>Participating</ParticipationBadge>
        )}
      </Title>
      <Owner>By {swap.owner_display_name}</Owner>
      <Description>{swap.description}</Description>
      <Tabs>
        <Tab>
          <Button
            isActive={activeTab === "members"}
            onClick={() => setActiveTab("members")}
          >
            Swap Group Members
          </Button>
        </Tab>
        {currentSwapMember.isEnrolled && (
          <Tab>
            <Button
              onClick={() => setActiveTab("selection")}
              isActive={activeTab === "selection"}
            >
              Your Selection
            </Button>
          </Tab>
        )}
        {currentSwapMember.isOwner && (
          <Tab>
            <Button
              onClick={() => setActiveTab("settings")}
              isActive={activeTab === "settings"}
            >
              Settings
            </Button>
          </Tab>
        )}
      </Tabs>
      {!currentSwapMember.isEnrolled && (
        <EnrollmentStatus>
          You aren't participating yet.{" "}
          <SwapManager
            id={swap.id}
            action="join"
            spotify_id={spotifyId}
            user_id={currentSwapMember.user_id}
          >
            Join this swap
          </SwapManager>
        </EnrollmentStatus>
      )}
      {activeTab === "selection" && (
        <Selection
          isEnrolled={currentSwapMember.isEnrolled}
          swapMember={currentSwapMember}
        />
      )}
      {activeTab === "members" && <Members swap={swap} />}
      {activeTab === "settings" && <Settings swap={swap} />}
    </div>
  );
}

const Title = styled.h1`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
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
  background-color: #2e3c43;
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
  border-bottom: 1px dotted #2e3c43;
`;

const Tab = styled.li`
  margin: 0 1rem 0 0;
  background-color: #2e3c43;
  color: #b0bec5;
  border-radius: 0.5rem 0.5rem 0 0;
  &:last-of-type {
    margin: 0;
  }
`;

const Button = styled.button<{ isActive: boolean }>`
  background-color: ${({ isActive }) => (isActive ? "#546E7A" : "#2e3c43")};
  border-radius: 0.5rem 0.5rem 0 0;
`;
