import * as models from "../../../../lib/models";

export default async function user(req, res) {
  const id: number | string = req.id;
  const spotifyUser = await getSpotifyUser(id);
  res.status(200).json({ spotifyUser: spotifyUser || null });
}

async function getSpotifyUser(id: number | string) {
  if (typeof id === "number") {
    return await models.spotifyUser.getById(id);
  }
  return await models.spotifyUser.getBySpotifyId(id);
}
