import fetch from "isomorphic-fetch";
import { SPOTIFY_API_BASE } from "../../../../../lib/constants";
import { getSession } from "../../../../../lib/iron";

// TODO: move this function to /api/spotify/features
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
    const { audio_features } = json;
    const features = audio_features.filter((f) => f);
    res.status(200).json({ features });
  } catch (e) {
    console.log("Error in playlists ", e);
  }
};
