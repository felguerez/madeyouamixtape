import passport from "passport";
import nextConnect from "next-connect";
import { spotifyStrategy } from "../../../lib/passport-spotify";
import { SCOPES } from "../../../lib/constants";

passport.use(spotifyStrategy);

export default nextConnect()
  .use(passport.initialize())
  .get(async (req, res) => {
    new Promise((resolve, reject) =>
      passport.authenticate(
        "spotify",
        {
          session: false,
          scope: SCOPES.join(" "),
        },
        (error, token) => {
          if (error) {
            reject(error);
          } else {
            resolve(token);
          }
        }
      )(req, res)
    );
  });
