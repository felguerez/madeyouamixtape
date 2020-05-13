import fetch from "isomorphic-fetch";
import { SPOTIFY_API_BASE } from "../../../../../lib/constants";
import { getSession } from "../../../../../lib/iron";

export default async (req, res) => {
  const { accessToken } = await getSession(req);
  console.log('accessToken:', accessToken);
  try {
    const playlists = await fetch(
      `${SPOTIFY_API_BASE}users/${req.query.id}/playlists`,
      {
        headers: {
          "Access-Control-Allow-Headers": "*",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const json = await playlists.json();
    res.status(200).json(json);
  } catch (e) {
    console.log("Error in playlists ", e);
  }
};
