import passport from "passport";
import { SCOPES } from "./constants";
import { spotifyStrategy } from "./passport-spotify";

passport.use(spotifyStrategy);

export const authenticate = (method, req, res) =>
  new Promise((resolve, reject) => {
    passport.authenticate(method, { session: false, scope: SCOPES.join(" ") })(
      req,
      res,
      (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      }
    );
  });
