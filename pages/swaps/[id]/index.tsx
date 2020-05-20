import styled from "@emotion/styled";
import PlaylistEntry from "../../../components/swaps/PlaylistEntry";
import { getSession } from "../../../lib/iron";
import * as models from "../../../lib/models";
import { Swap } from "../../../lib/models/swap";
import { SwapMember } from "../../../lib/models/swapMember";
import { SwapProvider } from "../../../contexts/swap-context";
import { serialize } from "../../../lib/utils";
import { useRouter } from "next/router";
import { ButtonLink, SwapManager } from "../../../components/SwapManager";
import { BackButton } from "../../../components/BackButton";
import React from "react";
import { User } from "../../../lib/models/user";
import { Button } from "../../../shared/styles";

export default function ({
  swap,
  currentSwapMember,
  user,
}: {
  swap: Swap & { owner_display_name: string };
  currentSwapMember: SwapMember & { isEnrolled: false };
  user: User;
}) {
  return (
    <SwapProvider>
      <BackButton />
      <Title>
        <span>{swap.title}</span>
      </Title>
      <Owner>By {swap.owner_display_name}</Owner>
      <Description>{swap.description}</Description>
      {currentSwapMember.isEnrolled ? (
        <PlaylistEntry swap={swap} currentSwapMember={currentSwapMember} />
      ) : (
        <Button>
          <SwapManager
            spotify_id={user.spotify_id}
            user_id={user.id}
            action="join"
            id={swap.id}
          >
            You aren't enrolled. Join now.
          </SwapManager>
        </Button>
      )}
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
      user: {
        spotify_id: user.spotify_id,
        id: user.id,
      },
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
