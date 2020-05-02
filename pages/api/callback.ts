import passport from "passport";
import nextConnect from "next-connect";
import { encryptSession } from "../../lib/iron";
import { setTokenCookie } from "../../lib/auth-cookies";

const authenticate = (method, req, res) =>
  new Promise((resolve, reject) =>
    passport.authenticate(method, { session: false }, (error, token) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    })(req, res)
  );

export default nextConnect()
  .use(passport.initialize())
  .get(async (req, res) => {
    try {
      const user = await authenticate("spotify", req, res);
      let session = {};
      // session is the payload to save in the token, it may contain basic info about the user
      if (typeof user === "object") {
        session = { ...user };
      }
      // The token is a string with the encrypted session
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
