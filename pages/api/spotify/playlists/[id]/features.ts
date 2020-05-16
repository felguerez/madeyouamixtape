import fetch from "isomorphic-fetch";
import { SPOTIFY_API_BASE } from "../../../../../lib/constants";
import { getSession } from "../../../../../lib/iron";

export default async (req, res) => {
  const { accessToken } = await getSession(req);
  try {
    const request = await fetch(
      `${SPOTIFY_API_BASE}audio-features/?ids=${req.query.ids}`,
      {
        headers: {
          "Access-Control-Allow-Headers": "*",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const json = await request.json();
    const { audio_features: features } = json;
    res.status(200).json({ features });
  } catch (e) {
    console.log("Error in playlists ", e);
  }
};
