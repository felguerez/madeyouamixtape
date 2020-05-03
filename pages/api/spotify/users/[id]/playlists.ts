import nextConnect from "next-connect";
import passport from "passport";
import { SPOTIFY_API_BASE } from "../../../../../lib/constants";
import { spotifyStrategy } from "../../../../../lib/passport-spotify";

passport.use(spotifyStrategy);

export default nextConnect()
  .use(passport.initialize())
  .get((req, res) => {
    fetch(`${SPOTIFY_API_BASE}users/${req.query.id}/playlists`, {
      headers: {
        "Access-Control-Allow-Headers": "*",
        Authorization: `Bearer ${req.query.token}`,
      },
    })
      .then((res) => res.json())
      .then((playlists) => {
        res.status(200).json(playlists);
      })
      .catch((err) => {
        console.log("err:", err);
      });
  });
