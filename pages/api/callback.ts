import queryString from "query-string";
import fetch from "isomorphic-fetch";
import { REDIRECT_URI } from "../../lib/constants";

export default async (req: any, res: any) => {
  const code = req.query.code || "";
  const body = {
    code,
    redirect_uri: REDIRECT_URI,
    grant_type: "authorization_code",
  };

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    body: queryString.stringify(body),
    headers: {
      Authorization:
        "Basic " +
        new Buffer(
          process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
        ).toString("base64"),
      Accept: "application/json, application/xml, text/play, text/html, *.*",
      "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
    },
    credentials: "same-origin",
  });
  const { access_token, token_type, refresh_token } = await response.json();
  // TODO: figure out how to use sessions
  console.log("access_token:", access_token);
  console.log("token_type:", token_type);
  console.log("refresh_token:", refresh_token);
  // req.session.access_token = access_token;
  // req.session.refresh_token = refresh_token;
  // res
  //   .status(200)
  //   .json({ access_token, refresh_token, token_type, opener: true });
  res.writeHead(302, {
    Location:
      "/popup?" +
      queryString.stringify({
        access_token,
        refresh_token,
        token_type,
        opener: true,
      }),
  });
  res.end();
};
