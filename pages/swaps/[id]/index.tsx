import { Swap } from "../../../lib/models/swap";
import { SpotifyUser } from "../../../lib/models/spotifyUser";
import * as models from "../../../lib/models";
import { SwapMember } from "../../../lib/models/swapMember";
import styled from "@emotion/styled";

export default function ({
  swap,
  owner,
  members,
  memberUsers,
}: {
  swap: Swap & { id: string };
  owner: SpotifyUser;
  members: SwapMember[];
  memberUsers: SpotifyUser[];
}) {
  return (
    <div>
      <h1>
        {swap.title} by {owner.display_name}
      </h1>
      <p>{swap.description}</p>
      <div>
        <h2>Members</h2>
        <Members>
          {members.map((member) => (
            <li key={member.user_id}>
              {
                memberUsers.find(
                  // @ts-ignore
                  (member) => member.user_id === memberUsers.id
                ).display_name
              }
            </li>
          ))}
        </Members>
      </div>
    </div>
  );
}

export async function getServerSideProps({ req, params }) {
  const swap = await models.swap.getById(params.id);
  const owner = await models.spotifyUser.getById(swap.owner_id);
  // @ts-ignore
  const members = await models.swapMember.getBySwapId(swap.id);
  const memberUsers = await models.user.getByIds(
    // @ts-ignore
    members.map((member) => member.id)
  );
  return {
    props: {
      swap: JSON.parse(JSON.stringify(swap)),
      owner: JSON.parse(JSON.stringify(owner)),
      members: JSON.parse(JSON.stringify(members)),
      memberUsers: JSON.parse(JSON.stringify(memberUsers)),
    },
  };
}

const Members = styled.ul`
  list-style: none;
  padding-left: 0;
`;
