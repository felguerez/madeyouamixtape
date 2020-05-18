import {Button, CopyContainer} from "../../shared/styles";
import {Spotify} from "../svg/Spotify";
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

