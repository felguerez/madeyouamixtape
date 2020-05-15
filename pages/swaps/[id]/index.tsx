import styled from "@emotion/styled";
import PlaylistEntry from "../../../components/swaps/PlaylistEntry";
import { getSession } from "../../../lib/iron";
import * as models from "../../../lib/models";
import { Swap } from "../../../lib/models/swap";
import { SwapMember } from "../../../lib/models/swapMember";

export default function ({
  swap,
  currentSwapMember,
}: {
  swap: Swap & { owner_display_name: string };
  currentSwapMember: SwapMember;
}) {
  return (
    <div>
      <Title>
        <span>{swap.title}</span>
      </Title>
      <Owner>By {swap.owner_display_name}</Owner>
      <Description>{swap.description}</Description>
      <PlaylistEntry swap={swap} currentSwapMember={currentSwapMember} />
    </div>
  );
}

export async function getServerSideProps({ req, params, res }) {
  const user = await getSession(req);
  if (!user) {
    res.writeHead(302, {
      Location: "/",
    });
  }
  const swap = await models.swap.getById(params.id);
  const currentSwapMember = swap.members.filter(
    (swapMember) => swapMember.user_id === user.id
  )[0];
  const isEnrolled = Boolean(currentSwapMember);
  return {
    props: {
      swap: JSON.parse(JSON.stringify(swap)),
      currentSwapMember: JSON.parse(
        JSON.stringify({ ...currentSwapMember, isEnrolled, spotifyId: user.spotify_id })
      ),
    },
  };
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

const Owner = styled.p`
  color: #009688;
  font-style: italic;
  display: inline-block;
  padding: 0;
  font-size: 1rem;
  margin: 0 0 1rem 0;
`;
