import Spotify from "passport-spotify";
import { REDIRECT_URI } from "./constants";
import { findUser } from "./user";

export const spotifyStrategy = new Spotify.Strategy(
  {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: REDIRECT_URI,
  },
  (accessToken, refreshToken, expires_in, profile, done) => {
    // upsert user here
    findUser({ username: profile.displayName, password: "" })
      .then((user) => {
        done(null, user);
      })
      .catch((error) => {
        done(error);
      });
  }
);
