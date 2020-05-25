import Link from "next/link";
import styled from "@emotion/styled";
import { useUser } from "../lib/hooks";
import {
  TRANSPARENT,
  GRAY,
  LIGHT_BLUE,
  WHITE,
  DARK_GRAY,
  DARK_BLUE,
  DARK_GREEN,
} from "../shared/styles";
import { Spotify } from "./svg/Spotify";

const Header = () => {
  const user = useUser();
  return (
    <header>
      <nav>
        <ul>
          <HomeNavItem>
            <Link href="/">
              <a>Home</a>
            </Link>
          </HomeNavItem>
          {user ? (
            <>
              <li>
                <Link href="/profile">
                  <a>Profile</a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a>About</a>
                </Link>
              </li>
              <li>
                <a href="/api/logout">Logout</a>
              </li>
            </>
          ) : (
            <li>
              <Link href="/api/auth/spotify">
                <LoginLink>
                  Login with
                  <Logo>
                    <Spotify />
                  </Logo>
                </LoginLink>
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <style jsx>{`
        header {
          border-top: 4px solid ${DARK_GREEN};
        }
        nav {
          max-width: 68.75rem;
          margin: 0 auto;
          padding: 0.2rem 0;
        }
        a {
          color: ${DARK_BLUE};
        }
        a:visited {
          color: ${DARK_BLUE};
        }
        a:hover {
          color: ${DARK_GREEN};
        }
        ul {
          display: flex;
          list-style: none;
          margin-left: 0;
          padding-left: 0;
        }
        li {
          margin-right: 1rem;
        }
        li:first-child {
          margin-left: auto;
        }
        li:last-of-type {
          margin-right: 0;
        }
        header {
          color: ${DARK_BLUE};
          background: ${WHITE};
          box-shadow: 0 8px 6px -6px #999;
        }
      `}</style>
    </header>
  );
};

const HomeNavItem = styled.li`
  margin-right: auto;
`;

const LoginLink = styled.a`
  cursor: pointer;
  display: flex;
  align-items: center;
  color: ${DARK_BLUE};
  font-weight: 500;
  font-size: 0.85rem;
  line-height: 1;
  &:hover {
    color: ${DARK_GREEN};
  }
  svg,
  g,
  path {
    fill: ${DARK_BLUE};
    &:hover {
      color: ${DARK_GREEN};
    }
  }
`;

const Logo = styled.span`
  margin-left: 0.5rem;
`;
export default Header;
