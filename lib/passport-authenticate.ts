import passport from "passport";
import { SCOPES } from "./constants";

export const authenticate = (method, req, res) =>
  new Promise((resolve, reject) => {
    passport.authenticate(method, { session: false, scope: SCOPES.join(" ") })(
      req,
      res,
      (error, token) => {
        if (error) {
          reject(error);
        } else {
          resolve(token);
        }
      }
    );
  });
