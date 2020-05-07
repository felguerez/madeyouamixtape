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
      console.log("called back");
      await authenticate("spotify", req, res);
      console.log("authenticated in callback");
      let session = {};
      const { accessToken, refreshToken, ...profile } = req.user; // req.user is set after authentication
      console.log("accessToken:", accessToken);
      const spotifyUser = await models.spotifyUser.findOrCreate(profile);
      console.log("spotifyUser:", spotifyUser);
      const user = await models.user.findOrCreate(spotifyUser);
      console.log("user:", user);

      if (typeof user === "object") {
        session = { ...user, accessToken, refreshToken };
      }
      console.log("session:", session);

      const token = await encryptSession(session);
      console.log("token:", token);
      setTokenCookie(res, token);
      console.log("cookie set");
      res.writeHead(302, {
        Location: "/",
      });
      res.end();
    } catch (error) {
      console.error(error);
      res.status(401).send(error.message);
    }
  });
