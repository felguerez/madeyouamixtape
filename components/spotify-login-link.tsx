import { openSignInWindow } from "../utils/open-popup";
import { AUTH_ENDPOINT, REDIRECT_URI, SCOPES } from "../lib/constants";
import { stringify } from "query-string";
import Link from "next/link";

export const SpotifyLoginLink = (props) => {
  return (
    <Link href="#">
      <a
        onClick={() =>
          openSignInWindow(
            `${AUTH_ENDPOINT}${
              "?" +
              stringify({
                client_id: process.env.client_id,
                redirect_uri: REDIRECT_URI,
                scope: SCOPES.join(" "),
                response_type: "code",
                show_dialog: true,
              })
            }`,
            "popup",
            (tokens) => {
              if (Object.keys(tokens).length) {
                console.log(tokens);
              }
            }
          )
        }
      >
        Spotify
      </a>
    </Link>
  );
};

