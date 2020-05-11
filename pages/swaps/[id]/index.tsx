import { Swap } from "../../../lib/models/swap";
import { SpotifyUser } from "../../../lib/models/spotifyUser";
import * as models from "../../../lib/models";
import styled from "@emotion/styled";
import { getSession } from "../../../lib/iron";
import { SwapManager } from "../../../components/SwapManager";
import { User } from "../../../lib/models/user";
import { useState } from "react";
import { Playlists } from "../../../components/Playlists";
import { SwapMember } from "../../../lib/models/swapMember";

export default function ({
  swap,
  currentSwapMember,
}: {
  swap: Swap & {
    members: (SwapMember & { display_name: string })[];
    owner_display_name: string;
  };
  currentSwapMember: SwapMember;
}) {
  const [activeTab, setActiveTab] = useState("members");
  const isEnrolled = Boolean(currentSwapMember);
  return (
    <div>
      <Title>
        <span>{swap.title}</span>
        {isEnrolled && <ParticipationBadge>Participating</ParticipationBadge>}
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
        <Tab>
          <Button
            onClick={() => setActiveTab("playlists")}
            isActive={activeTab === "playlists"}
          >
            View your playlists
          </Button>
        </Tab>
      </Tabs>
      {!isEnrolled && (
        <EnrollmentStatus>
          You aren't participating yet.{" "}
          <SwapManager id={swap.id} action="join" spotify_id="felguerez">
            Join this swap
          </SwapManager>
        </EnrollmentStatus>
      )}
      {activeTab === "playlists" && (
        <Playlists isEnrolled={isEnrolled} swapMember={currentSwapMember} />
      )}
      {activeTab === "members" && (
        <BodyContent>
          <h2>Members</h2>
          <p>
            These people are swapping playlists with each other and finding new
            cool music.
          </p>
          <Members>
            {swap.members.map((member) => {
              return (
                <li key={member.id}>
                  <MemberName>{member.display_name}</MemberName>
                  {member.selected_playlist_uri && (
                    <ReadyToShareStatus>Ready to share</ReadyToShareStatus>
                  )}
                </li>
              );
            })}
          </Members>
        </BodyContent>
      )}
    </div>
  );
}

export async function getServerSideProps({ req, res, params }) {
  const sessionUser = await getSession(req);
  if (!sessionUser) {
    res.writeHead(302, {
      Location: "/",
    });
    res.end();
  }
  const swap = await models.swap.getById(params.id);
  const owner = await models.spotifyUser.getById(swap.owner_id);
  const swapMembers = await models.swapMember.getBySwapId(swap.id);
  const currentSwapMember = swapMembers.filter(
    (swapMember) => swapMember.user_id === sessionUser.id
  )[0];
  const swapMemberUsers = await models.user.getByIds(
    swapMembers.map((member) => member.id)
  );
  return {
    props: {
      swap: JSON.parse(JSON.stringify(swap)),
      owner: JSON.parse(JSON.stringify(owner)),
      swapMemberUsers: JSON.parse(JSON.stringify(swapMemberUsers)),
      swapMembers: JSON.parse(JSON.stringify(swapMembers)),
      currentSwapMember: JSON.parse(JSON.stringify(currentSwapMember)),
      spotifyId: sessionUser.spotify_id,
    },
  };
}

const BodyContent = styled.div`
  padding: 2rem;
`;

const Members = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const Title = styled.h1`
  margin: 0;
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
  font-style: italic;
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

const ReadyToShareStatus = styled.span`
  color: rgba(172, 234, 110);
`;

const MemberName = styled.h4`
  margin: 0;
`;
