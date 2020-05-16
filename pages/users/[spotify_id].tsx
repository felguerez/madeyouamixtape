import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const SpotifyProfile = () => {
  const router = useRouter();
  const [spotifyProfile, setSpotifyProfile] = useState({ display_name: null });
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/spotify/users/${router.query.spotify_id}`);
        const spotifyProfile = await response.json();
        setSpotifyProfile(spotifyProfile);
      } catch (e) {
        console.log("e:", e);
      }
    }
    fetchData();
  }, []);
  return (
    <div>
      <h2>Profile for {router.query.spotify_id}</h2>
      {spotifyProfile && <div>{spotifyProfile.display_name}</div>}
    </div>
  );
};

export default SpotifyProfile;
