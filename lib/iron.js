import Iron from "@hapi/iron";
import fetch from "isomorphic-fetch";
import { getTokenCookie } from "./auth-cookies";
import queryString from "querystring";

// Use an environment variable here instead of a hardcoded value for production
const TOKEN_SECRET = "this-is-a-secret-value-with-at-least-32-characters";

export function encryptSession(session) {
  return Iron.seal(session, TOKEN_SECRET, Iron.defaults);
}

export async function getSession(req) {
  let token = getTokenCookie(req);
  let session = null;
  if (token) {
    // TODO: this can become its own function
    session = await Iron.unseal(token, TOKEN_SECRET, Iron.defaults);
    if (session.expiresAt < new Date().getTime()) {
      const { access_token, expires_in } = await requestNewAccessToken(
        session.refreshToken
      );
      session = {
        ...session,
        accessToken: access_token,
        expiresAt: session.expiresAt + expires_in * 1000,
      };
    }
  }
  return session;
}

async function requestNewAccessToken(refreshToken) {
  const refresh = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(
        process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
      ).toString("base64")}`,
      Accept: "application/json, application/xml, text/play, text/html, *.*",
      "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
    },
    body: queryString.stringify({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });
  return await refresh.json();
}
