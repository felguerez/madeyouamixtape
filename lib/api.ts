export const updateSelectedPlaylist = async ({
  swap_id,
  selected_playlist_id,
  swap_member_id,
}: {
  swap_id: number;
  selected_playlist_id: number;
  swap_member_id: number;
}) => {
  const response = await fetch(`/api/swap_members/${swap_member_id}/update`, {
    method: "post",
    body: JSON.stringify({
      selected_playlist_id,
      swap_id,
    }),
  });
  if (!response.ok) {
    return response.json();
  }
};
