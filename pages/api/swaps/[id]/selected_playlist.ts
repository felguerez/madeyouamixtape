import { getSession } from "../../../../lib/iron";
import * as constants from "../../../../lib/constants";

export default async (req, res) => {
  const { accessToken } = await getSession(req);
  console.log('accessToken:', accessToken);
  try {
    const apiPlaylist = await fetch(
      `${constants.SPOTIFY_API_BASE}playlists/${req.query.selectedPlaylistId}`,
      {
        headers: {
          "Access-Control-Allow-Headers": "*",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const playlist = await apiPlaylist.json();
    res.status(200).json({ playlist });
  } catch (e) {
    console.log("e:", e);
  }
};
