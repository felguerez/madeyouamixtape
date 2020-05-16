import { getSession } from "../../../../../lib/iron";
import * as constants from "../../../../../lib/constants";

export default async (req, res) => {
  switch (req.method) {
    default:
    case "GET":
      const { accessToken } = await getSession(req);
      try {
        const response = await fetch(
          `${constants.SPOTIFY_API_BASE}users/${req.query.id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              Accept:
                "application/json, application/xml, text/play, text/html, *.*",
            },
          }
        );
        const spotifyUser = await response.json();
        res.status(200).json(spotifyUser);
      } catch (e) {
        console.log("e:", e);
        res.status(500).json({ error: e });
      }
  }
};
