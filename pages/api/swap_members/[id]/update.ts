import { getSession } from "../../../../lib/iron";
import * as models from "../../../../lib/models";

export default async function swapMembers(req, res) {
  const session = await getSession(req);
  switch (req.method) {
    case "POST":
      const body = JSON.parse(req.body);
      const { selected_playlist_id } = body;
      const swap_member_id = req.query.id;
      if (selected_playlist_id) {
        await models.swapMember.selectPlaylist({
          id: swap_member_id,
          selected_playlist_id: body.selected_playlist_id,
        });
        res.status(200);
        res.end();
        break;
      } else {
        const { swap_id, current_received_playlist_id } = body;
        const swap = await models.swap.getById(swap_id);
        const eligiblePlaylists = swap.members
          .filter((swapMember) => swapMember.id !== Number(swap_member_id))
          .map((member) => member.selected_playlist_id)
          .filter(
            (selectedPlaylistId) =>
              selectedPlaylistId !== current_received_playlist_id
          );
        const receivedPlaylistId =
          eligiblePlaylists[
            Math.floor(Math.random() * eligiblePlaylists.length)
          ];
        try {
          await models.swapMember.receivePlaylist({
            id: swap_member_id,
            received_playlist_id: receivedPlaylistId,
          });
          res.status(200).json({ receivedPlaylistId });
          res.end();
          break;
        } catch (e) {
          console.log("e:", e);
        }
      }

    case "GET":
      const swapsByUserId = await models.swap.getSwapsByUserId(session.id);
      res.status(200).json(swapsByUserId);
      break;
    default:
      console.log("ERROR unhandled method ", req.method);
  }
}
