import { Strategy as SpotifyStrategy } from "passport-spotify";
import { REDIRECT_URI } from "../constants";

export const strategy = new SpotifyStrategy(
  {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: REDIRECT_URI,
  },
  (accessToken, refreshToken, expires_in, profile, done) => {
    // upsert user here
    console.log(
      "accessToken, refreshToken, expires_in:",
      accessToken,
      refreshToken,
      expires_in
    );
    console.log("profile:", profile);
    return done(null, profile);
  }
);
