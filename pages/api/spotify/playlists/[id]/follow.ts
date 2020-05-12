import fetch from "isomorphic-fetch";
import { SPOTIFY_API_BASE } from "../../../../../lib/constants";
import { getSession } from "../../../../../lib/iron";

export default async (req, res) => {
  const { accessToken } = await getSession(req);
  try {
    const follow = await fetch(
      `${SPOTIFY_API_BASE}playlists/${req.query.id}/followers`,
      {
        method: "PUT",
        headers: {
          "Access-Control-Allow-Headers": "*",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ public: true }),
      }
    );
    if (follow.ok) res.status(200).json({});
    res.status(422);
  } catch (e) {
    console.log("Error in playlists ", e);
  }
};
