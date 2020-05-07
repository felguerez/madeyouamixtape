import { SPOTIFY_API_BASE } from "../../../../../lib/constants";

export default async (req, res) => {
  const playlists = await fetch(
    `${SPOTIFY_API_BASE}users/${req.query.id}/playlists`,
    {
      headers: {
        "Access-Control-Allow-Headers": "*",
        Authorization: `Bearer ${req.query.token}`,
      },
    }
  );
  const json = await playlists.json();
  res.status(200).json(json);
};
