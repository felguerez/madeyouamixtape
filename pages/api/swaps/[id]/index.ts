import * as models from "../../../../lib/models";
import { getSession } from "../../../../lib/iron";

export default async (req, res) => {
  const sessionUser = await getSession(req);
  let swap;
  switch (req.method) {
    case "PUT":
      const { title, description } = req.body;
      await models.swap.updateMetadata({
        title,
        description,
        id: req.query.id,
      });
      res.status(200).json({});
      break;
    // shuffle playlists
    case "POST":
      if (!sessionUser) {
        res.writeHead(302, {
          Location: "/",
        });
        res.end();
      }
      swap = await models.swap.getById(req.query.id);

      swap.members.forEach(async (member, i) => {
        const playlists = swap.members
          .filter((swappingMember) => {
            return swappingMember.user_id != member.id;
          })
          .map((member) => member.selected_playlist_id);
        try {
          await models.swapMember.receivePlaylist({
            id: member.id,
            received_playlist_id:
              playlists[Math.floor(Math.random() * playlists.length)],
          });
        } catch (e) {
          console.log("e:", e);
        }
      });
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
