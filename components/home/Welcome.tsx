import { CopyContainer, GRAY, WHITE } from "../../shared/styles";
import styled from "@emotion/styled";
import { Spotify } from "../svg/Spotify";
import Link from "next/link";

export const Welcome = () => {
  return (
    <CopyContainer>
      <h1>Made You A Mixtape</h1>
      <p>Share some music with people you know or random strangers.</p>
      <p>Make it a party and invite your friends with great taste. </p>
      <Link href="/api/auth/spotify">
        <Button>
          Login with <Spotify />
        </Button>
      </Link>
    </CopyContainer>
  );
};

const Button = styled.button`
  font-family: "Circular Spotify Text", "Helvetica Neue", Verdana, sans-serif;
  display: flex;
  align-items: center;
  border-radius: 2rem;
  padding: 1rem 2rem;
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
