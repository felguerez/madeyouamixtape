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
      const response = await request.json();
      setPlaylist(response.playlist);
    }
    if (selectedPlaylistId) {
      fetchData().catch((err) => {});
    }
  }, [selectedPlaylistId]);
  if (!playlist) {
    return <h2>Loading...</h2>;
  }
  return (
    <>
      <h2>{playlist.name}</h2>
      <p>This is the playlist you chose. Looks great!</p>
      <div>
        <h3>{playlist?.name}</h3>
        <ul>
          {playlist.tracks &&
            playlist.tracks.items.map((item) => {
              return (
                <li>
                  <p>
                    {item.track.artists.map((artist) => artist.name).join(", ")}
                  </p>
                  <p>{item.track.name}</p>
                  {item.track.album.images && (
                    <img src={item.track.album.images[0]?.href} alt="" />
                  )}
                  {item.track.preview_url && (
                    <audio controls={true}>
                      <source src={item.track.preview_url} type="audio/mpeg" />
                    </audio>
                  )}
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
};

export default SelectedPlaylist;
