import * as models from "../../../../lib/models";
import { getSession } from "../../../../lib/iron";

export default async (req, res) => {
  const sessionUser = await getSession(req);
  if (!sessionUser) {
    res.writeHead(302, {
      Location: "/",
    });
    res.end();
  }
  let swap;
  switch (req.method) {
    case "PUT":
      swap = await models.swap.getById(req.query.id);
      const playlists = swap.members
        .filter((member) => member.user_id !== sessionUser.id)
        .map((member) => member.selected_playlist_id);
      swap.members.forEach(async (member, i) => {
        try {
          await models.swapMember.receivePlaylist({
            id: member.id,
            received_playlist_id: playlists[i % playlists.length],
          });
        } catch (e) {
          console.log("e:", e);
        }
      });
      // TODO: finish the swap, shuffle the playlists
      // TODO: get all swap members by swap ID
      //
      res.writeHead(302, { Location: `/swaps/${req.query.id}` });
      res.end();
      break;
    default:
    case "GET":
      swap = await models.swap.getById(req.query.id);
      const currentSwapMember = swap.members.filter(
        (swapMember) => swapMember.user_id === sessionUser.id
      )[0];
      const isOwner =
        currentSwapMember !== undefined &&
        currentSwapMember.user_id === swap.owner_id;
      const isEnrolled = Boolean(currentSwapMember);
      res.status(200).json({
        swap,
        currentSwapMember: {
          ...currentSwapMember,
          isOwner,
          isEnrolled,
        },
        spotifyId: sessionUser.spotify_id,
      });
  }
};
