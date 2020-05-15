import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const SelectedPlaylist = () => {
  const [playlist, setPlaylist] = useState({});
  const router = useRouter();
  const { id, selectedPlaylistId } = router.query;
  useEffect(() => {
    async function fetchData() {
      const request = await fetch(
        `/api/swaps/${id}/selected_playlist?selectedPlaylistId=${selectedPlaylistId}`
      ).catch((err) => {
        console.log("err:", err);
      });
      const { playlist } = await request.json();
      setPlaylist(playlist);
    }
    if (selectedPlaylistId) {
      fetchData().catch((err) => {});
    }
  }, [selectedPlaylistId]);
  return (
    <>
      <h2>Selected playlist</h2>
      <p>This is the playlist you chose. Looks great!</p>
      <div>
        <h3>{playlist?.name}</h3>
      </div>
    </>
  );
};

export default SelectedPlaylist;
