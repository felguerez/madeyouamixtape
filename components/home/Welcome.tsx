import { Button, CopyContainer, GRAY, WHITE } from "../../shared/styles";
import { Spotify } from "../svg/Spotify";
import Link from "next/link";
import styled from "@emotion/styled";

export const Welcome = () => {
  return (
    <CopyContainer>
      <h1>Made You A Mixtape</h1>
      <p>Share some music with people you know or random strangers.</p>
      <p>Make it a party and invite your friends with great taste. </p>
      <Link href="/api/auth/spotify">
        <LoginButton>
          Login with <Spotify />
        </LoginButton>
      </Link>
    </CopyContainer>
  );
};

const LoginButton = styled(Button)`
  color: ${GRAY};
  &:hover {
    color: ${WHITE};
    svg,
    g,
    path {
      fill: ${WHITE};
    }
  }
  svg {
    margin-left: 0.5rem;
  }
`;
