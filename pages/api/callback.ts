import passport from "passport";
import nextConnect from "next-connect";
import { encryptSession } from "../../lib/iron";
import { setTokenCookie } from "../../lib/auth-cookies";
import * as models from "../../lib/models";
import { authenticate } from "../../lib/passport-authenticate";

export default nextConnect()
  .use(passport.initialize())
  .get(async (req, res) => {
    try {
      await authenticate("spotify", req, res);
      let session = {};
      const { accessToken, refreshToken, expiresAt, ...profile } = req.user; // req.user is set after authentication
      console.log("profile:", profile);
      const spotifyUser = await models.spotifyUser.findOrCreate(profile);
      const user = await models.user.findOrCreate({
        ...spotifyUser,
        image_url: profile.photos[0],
      });

      if (typeof user === "object") {
        session = { ...user, accessToken, refreshToken, expiresAt };
      }

      const token = await encryptSession(session);
      setTokenCookie(res, token);
      res.writeHead(302, {
        Location: "/",
      });
      res.end();
    } catch (error) {
      console.error(error);
      res.status(401).send(error.message);
    }
  });
