import Spotify from "passport-spotify";
import { REDIRECT_URI } from "./constants";
import { Seconds, SpotifyProfile } from "./models/spotifyUser";

export const spotifyStrategy = new Spotify.Strategy(
  {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: REDIRECT_URI,
  },
  (
    accessToken: string,
    refreshToken: string,
    expires_in: Seconds,
    profile: SpotifyProfile,
    done
  ) => {
    done(null, {
      ...profile,
      accessToken,
      refreshToken,
      expiresAt: new Date().getTime() + expires_in * 1000,
    });
  }
);
