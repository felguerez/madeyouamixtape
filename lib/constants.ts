export const REDIRECT_URI: string =
  process.env.NODE_ENV === "production"
    ? "https://yf-playlist.now.sh/api/callback"
    : "http://localhost:3000/api/callback";
export const SCOPES: string[] = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "playlist-modify-private",
  "playlist-read-private",
  "playlist-read-collaborative",
];
export const SPOTIFY_API_BASE = "https://api.spotify.com/v1/";
export const PLAYLIST_ID = "3qr5qFKyiGDniMIgJ45mix";
export const BASE_URL: string =
  process.env.NODE_ENV === "production"
    ? "https://yf-playlist.now.sh"
    : "http://localhost:3000";
