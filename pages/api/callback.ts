import passport from "passport";
import nextConnect from "next-connect";
import { encryptSession } from "../../lib/iron";
import { setTokenCookie } from "../../lib/auth-cookies";
import { authenticate } from "../../lib/passport-authenticate";

export default nextConnect()
  .use(passport.initialize())
  .get(async (req, res) => {
    try {
      const user = await authenticate("spotify", req, res);
      let session = {};
      if (typeof user === "object") {
        session = { ...user };
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
