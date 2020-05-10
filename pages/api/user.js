import { getSession } from "../../lib/iron";
import * as models from "../../lib/models";

export default async function user(req, res) {
  let session, user, spotifyUser;
  try {
    session = await getSession(req);
  } catch (e) {
    console.log("e:", e);
  }
  // TODO: is this db query necessary if we have the user in the session?
  if (session) {
    user = await models.user.getById(session.id);
    spotifyUser = await models.spotifyUser.getBySpotifyId(user.spotify_id);
  }
  res
    .status(200)
    .json({ user: user || null, spotifyUser: spotifyUser || null });
}
