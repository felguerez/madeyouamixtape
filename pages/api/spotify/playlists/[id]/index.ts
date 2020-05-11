import fetch from "isomorphic-fetch";
import { SPOTIFY_API_BASE } from "../../../../../lib/constants";
import { getSession } from "../../../../../lib/iron";

export default async (req, res) => {
  const { accessToken } = await getSession(req);
  try {
    const playlist = await fetch(
      `${SPOTIFY_API_BASE}playlists/${req.query.id}`,
      {
        headers: {
          "Access-Control-Allow-Headers": "*",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const json = await playlist.json();
    res.status(200).json(json);
  } catch (e) {
    console.log("Error in playlists ", e);
  }
};
