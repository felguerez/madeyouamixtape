import {
  Button,
  CopyContainer,
  DARK_BLUE,
  DARK_GRAY,
  DARK_GREEN,
  GRAY,
  WHITE,
} from "../../shared/styles";
import { Spotify } from "../svg/Spotify";
import Link from "next/link";
import styled from "@emotion/styled";
import { css } from "@emotion/core";

export const Welcome = () => {
  return (
    <div>
      <Hero>
        <HeroCopy>
          <Headline>Made You A Mixtape</Headline>
          <p>Share some music with people you know or random strangers.</p>
          <p>Make it a party and invite your friends with great taste. </p>
          <Link href="/api/auth/spotify">
            <LoginButton>
              Login with <Spotify />
            </LoginButton>
          </Link>
        </HeroCopy>
      </Hero>
      <MainContainer>
        <CenteredCopy>
          <h2>How it works</h2>
          <ul>
            <li>
              <Circle>
                <SpotifyIcon>
                  <img src="spotify-icon.svg" alt="" />
                </SpotifyIcon>
              </Circle>
              <span>
                Log in with <strong>Spotify</strong>
              </span>
            </li>
            <li>
              <Circle>
                <i className="material-icons">swap_calls</i>
              </Circle>
              <span>
                See <strong>who is swapping playlists</strong> and what vibe
                they're curating
              </span>
            </li>
            <li>
              <Circle>
                <i className="material-icons">group_add</i>
              </Circle>
              <span>
                Join a group of <strong>like-minded individuals</strong>
              </span>
            </li>
            <li>
              <Circle>
                <i className="material-icons">playlist_add_check</i>
              </Circle>
              <span>
                <strong>Choose a playlist</strong> to share with your friends
              </span>
            </li>
            <li>
              <Circle>
                <i className="material-icons">playlist_add</i>
              </Circle>
              <span>
                Get a new playlist and <strong>subscribe</strong>
              </span>
            </li>
          </ul>
        </CenteredCopy>
      </MainContainer>
      <CenteredCopy
        css={css`
          background: ${GRAY};
          padding: 2rem 0;
          margin-bottom: 0;
        `}
      >
        <h2>Listen to something new</h2>
        <p>Get swapping now</p>
        <Link href="/api/auth/spotify">
          <FinalCTA>
            Login with <Spotify />
          </FinalCTA>
        </Link>
      </CenteredCopy>
    </div>
  );
};

const LoginButton = styled(Button)`
  color: ${GRAY};
  margin-right: auto;
  margin-top: 2rem;
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

const FinalCTA = styled(LoginButton)`
  margin-left: auto;
`;

const Headline = styled.h1`
  line-height: 1.2;
  margin: 0 0 1rem 0;
`;

const Hero = styled.div`
  padding: 2rem 1.25rem;
  background: ${DARK_GREEN};
  height: 420px;
`;

const HeroCopy = styled.div`
  width: 68.75rem;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  h1,
  p {
    color: ${GRAY};
  }
  p {
    margin: 0;
    line-height: 1.5;
  }
`;

const MainContainer = styled.div`
  width: 68.75rem;
  margin: 0 auto;
`;

const CenteredCopy = styled.div`
  margin: 6rem auto;
  text-align: center;
  li {
    list-style: none;
    text-align: left;
    display: flex;
    align-items: center;
    line-height: 2;
    margin-bottom: 1rem;
  }
`;

const Circle = styled.div`
  display: inline-flex;
  background: ${DARK_GREEN};
  color: ${WHITE};
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  justify-content: center;
  align-items: center;
  margin: 0 0.5rem;
`;

const SpotifyIcon = styled.span`
  width: 3rem;
  height: 3rem;
  display: inline-block;
`;
