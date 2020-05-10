import Link from "next/link";
import styled from "@emotion/styled";
import { useUser } from "../lib/hooks";

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
                <Link href="/swaps">
                  <a>Swaps</a>
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
          max-width: 64rem;
          margin: 0 auto;
          padding: 0.2rem 1.25rem;
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
        header {
          color: #fff;
          background: #282828;
        }
      `}</style>
    </header>
  );
};

const HomeNavItem = styled.li`
  margin-right: auto;
`;
export default Header;
