import Spotify from "passport-spotify";
import { REDIRECT_URI } from "./constants";
import * as models from "./models";
import { SpotifyProfile } from "./models/spotifyUser";

export const spotifyStrategy = new Spotify.Strategy(
  {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: REDIRECT_URI,
  },
  (
    accessToken: string,
    refreshToken: string,
    expires_in: number,
    profile: SpotifyProfile,
    done
  ) => {
    models.spotifyUser.findOrCreate(profile).then((spotifyUser) => {
      models.user
        .findOrCreate(spotifyUser)
        .then((user) => {
          done(null, { ...user, accessToken });
        })
        .catch((err) => {
          console.log("err:", err);
          done(err);
        });
    });
  }
);
