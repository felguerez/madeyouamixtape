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
    if (!audio_features.filter((f) => f).length) {
      return res.status(200).json({});
    }
    const features = audio_features.reduce(
      (accumulator, feature, i) => {
        Object.keys(accumulator).forEach((key) => {
          accumulator[key] = accumulator[key] + feature[key];
          if (i === audio_features.length - 1) {
            accumulator[key] = accumulator[key] / i;
          }
        });
        return accumulator;
      },
      {
        danceability: 0,
        energy: 0,
        loudness: 0,
        speechiness: 0,
        acousticness: 0,
        instrumentalness: 0,
        liveness: 0,
        valence: 0,
      }
    );
    res.status(200).json({ features });
  } catch (e) {
    console.log("Error in playlists ", e);
    res.status(500).json({});
  }
};
