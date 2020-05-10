import { Swap } from "../../../lib/models/swap";
import { SpotifyUser } from "../../../lib/models/spotifyUser";
import * as models from "../../../lib/models";
import { SwapMember } from "../../../lib/models/swapMember";
import styled from "@emotion/styled";
import { getSession } from "../../../lib/iron";
import { SwapManager } from "../../../components/SwapManager";
import { User } from "../../../lib/models/user";

export default function ({
  swap,
  owner,
  swapMemberUsers,
  isEnrolled,
}: {
  swap: Swap & { id: number };
  owner: SpotifyUser;
  swapMemberUsers: User[];
  isEnrolled: boolean;
}) {
  return (
    <div>
      <Title>
        <span>
          {swap.title} by {owner.display_name}
        </span>
        {isEnrolled && <ParticipationBadge>Participating</ParticipationBadge>}
      </Title>
      <Description>{swap.description}</Description>
      {!isEnrolled && (
        <EnrollmentStatus>
          You aren't participating yet.{" "}
          <SwapManager id={swap.id} action="join" spotify_id="felguerez">
            Join this swap
          </SwapManager>
        </EnrollmentStatus>
      )}
      <div>
        <h2>Members</h2>
        <Members>
          {swapMemberUsers.map((member) => {
            return <li key={member.id}>{member.display_name}</li>;
          })}
        </Members>
      </div>
    </div>
  );
}

export async function getServerSideProps({ req, params }) {
  const sessionUser = await getSession(req);
  const swap = await models.swap.getById(params.id);
  const owner = await models.spotifyUser.getById(swap.owner_id);
  const swapMembers = await models.swapMember.getBySwapId(swap.id);
  const swapMemberUsers = await models.user.getByIds(
    swapMembers.map((member) => member.id)
  );
  const isEnrolled = Boolean(
    swapMemberUsers?.filter(
      (swapMemberUser) => swapMemberUser.id === sessionUser.id
    )[0]
  );
  return {
    props: {
      swap: JSON.parse(JSON.stringify(swap)),
      owner: JSON.parse(JSON.stringify(owner)),
      swapMemberUsers: JSON.parse(JSON.stringify(swapMemberUsers)),
      isEnrolled,
      spotifyId: sessionUser.spotify_id,
    },
  };
}

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
