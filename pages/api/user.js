import { getSession } from "../../lib/iron";
import * as models from "../../lib/models";

export default async function user(req, res) {
  let session, user, spotifyUser;
  try {
    session = await getSession(req);
    if (session) {
      user = await models.user.getById(session.id);
      spotifyUser = await models.spotifyUser.getBySpotifyId(user.spotify_id);
    }
    res
      .status(200)
      .json({ user: user || null, spotifyUser: spotifyUser || null });
  } catch (e) {
    console.log("e:", e);
    res.status(500).json({ error: e });
  }
}
