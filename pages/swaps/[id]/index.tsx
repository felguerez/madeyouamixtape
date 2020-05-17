import styled from "@emotion/styled";
import PlaylistEntry from "../../../components/swaps/PlaylistEntry";
import { getSession } from "../../../lib/iron";
import * as models from "../../../lib/models";
import { Swap } from "../../../lib/models/swap";
import { SwapMember } from "../../../lib/models/swapMember";
import { SwapProvider } from "../../../contexts/swap-context";
import { serialize } from "../../../lib/utils";
import { useRouter } from "next/router";
import { ButtonLink } from "../../../components/SwapManager";

export default function ({
  swap,
  currentSwapMember,
}: {
  swap: Swap & { owner_display_name: string };
  currentSwapMember: SwapMember;
}) {
  const router = useRouter();
  return (
    <SwapProvider>
      <BackButton>
        <i className="material-icons" onClick={router.back}>
          arrow_back
        </i>
      </BackButton>
      <Title>
        <span>{swap.title}</span>
      </Title>
      <Owner>By {swap.owner_display_name}</Owner>
      <Description>{swap.description}</Description>
      <PlaylistEntry swap={swap} currentSwapMember={currentSwapMember} />
    </SwapProvider>
  );
}

export async function getServerSideProps({ req, params, res }) {
  const user = await getSession(req);
  if (!user) {
    res.writeHead(302, {
      Location: "/",
    });
    res.end();
  }
  const swap = await models.swap.getById(params.id);
  const currentSwapMember = swap.members.filter(
    (swapMember) => swapMember.user_id === user.id
  )[0];
  const isEnrolled = Boolean(currentSwapMember);
  return {
    props: {
      swap: serialize(swap),
      currentSwapMember: serialize({
        ...currentSwapMember,
        isEnrolled,
        spotifyId: user.spotify_id,
      }),
    },
  };
}

const Title = styled.h1`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin: 0;
`;
const Description = styled.p`
  margin: 0 0 2rem 0;
`;

const Owner = styled.p`
  color: #009688;
  font-style: italic;
  display: inline-block;
  padding: 0;
  font-size: 1rem;
  margin: 0 0 1rem 0;
`;

const BackButton = styled(ButtonLink)`
  margin-top: -1rem;
`;
