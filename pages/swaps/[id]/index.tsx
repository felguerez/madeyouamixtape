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
  swapMembers,
  swapMemberUsers,
  isEnrolled,
}: {
  swap: Swap & { id: number };
  owner: SpotifyUser;
  swapMembers: SwapMember[];
  swapMemberUsers: User[];
  isEnrolled: boolean;
}) {
  console.log("swapMemberUsers:", swapMemberUsers);
  console.log('swapMembers:', swapMembers);
  return (
    <div>
      <h1>
        {swap.title} by {owner.display_name}
      </h1>
      <p>{swap.description}</p>
      <div>
        <h2>Members</h2>
        <Members>
          {swapMemberUsers.map((member) => {
            return <li key={member.id}>{member.display_name}</li>;
          })}
        </Members>
        {!isEnrolled && (
          <p>
            You aren't participating in this swap.{" "}
            <SwapManager id={swap.id} action="join" spotify_id={"felguerez"}>
              Join this swap
            </SwapManager>
          </p>
        )}
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
    swapMemberUsers.find(
      (swapMemberUser) => swapMemberUser.id === sessionUser.id
    )
  );
  return {
    props: {
      swap: JSON.parse(JSON.stringify(swap)),
      owner: JSON.parse(JSON.stringify(owner)),
      swapMembers: JSON.parse(JSON.stringify(swapMembers)),
      swapMemberUsers: JSON.parse(JSON.stringify(swapMemberUsers)),
      isEnrolled,
    },
  };
}

const Members = styled.ul`
  list-style: none;
  padding-left: 0;
`;
