import Link from "next/link";
import styled from "@emotion/styled";
import { useUser } from "../lib/hooks";
import {
  DARK_GRAY,
  LIGHT_BLUE,
  WHITE,
} from "../shared/styles";

const Header = () => {
  const identity = useUser();

  return (
    <header>
      <nav>
        <ul>
          <HomeNavItem>
            <Link href="/">
              <a>Home</a>
            </Link>
          </HomeNavItem>
          {identity.user ? (
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
                <a>Login with Spotify</a>
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <style jsx>{`
        nav {
          max-width: 68.75rem;
          margin: 0 auto;
          padding: 0.2rem 0;
        }
        a {
          color: ${WHITE};
        }
        a:visited {
          color: ${WHITE};
        }
        a:hover {
          color: ${DARK_GRAY};
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
          color: #fff;
          background: ${LIGHT_BLUE};
          box-shadow: 0 8px 6px -6px #999;
        }
      `}</style>
    </header>
  );
};

const HomeNavItem = styled.li`
  margin-right: auto;
`;
export default Header;
