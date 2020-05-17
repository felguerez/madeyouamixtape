import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ButtonLink } from "../../components/SwapManager";
import { PlaylistGallery } from "../../components/PlaylistGallery";
import { useSwapState } from "../../contexts/swap-context";

const SpotifyProfile = () => {
  const router = useRouter();
  const [spotifyProfile, setSpotifyProfile] = useState<null | {
    display_name: string;
    followers: { href: string; total: number };
  }>(null);
  const [playlists, setPlaylists] = useState([]);
  const { spotify_id } = router.query;
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/spotify/users/${spotify_id}`);
        const spotifyProfile = await response.json();
        setSpotifyProfile(spotifyProfile);
      } catch (e) {
        console.log("e:", e);
      }
    }
    if (spotify_id) {
      fetchData();
    }
  }, [spotify_id]);
  return (
    <div>
      <h2>Profile for {router.query.spotify_id}</h2>
      {spotifyProfile && (
        <div>
          <h3>{spotifyProfile.display_name}</h3>
          <p>{spotifyProfile.followers.total} followers</p>
          <ButtonLink
            onClick={async () => {
              const request = await fetch(
                `/api/spotify/users/${spotify_id}/playlists`
              );
              const playlists = await request.json();
              setPlaylists(playlists.items);
              console.log("playlists:", playlists);
            }}
          >
            Load {spotifyProfile.display_name}'s playlists
          </ButtonLink>
          {playlists.map(playlist => {
            return (
              <div key={playlist.id}>
                {playlist.name}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SpotifyProfile;
