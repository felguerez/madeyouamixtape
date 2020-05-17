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
      const selectedPlaylists = swap.members
        .map((member) => member.selected_playlist_id)
        .filter((playlist) => playlist);

      let ownersNewPlaylistId;

      const updateSwapMember = async (member) => {
        const eligiblePlaylists = selectedPlaylists.filter(
          (playlistId) => member.selected_playlist_id !== playlistId
        );
        const receivedPlaylistId =
          eligiblePlaylists[
            Math.floor(Math.random() * eligiblePlaylists.length)
          ];
        if (member.user_id === sessionUser.id) {
          ownersNewPlaylistId = receivedPlaylistId;
        }
        try {
          await models.swapMember.receivePlaylist({
            id: member.id,
            received_playlist_id: receivedPlaylistId,
          });
        } catch (e) {
          console.log("e:", e);
        }
      };
      await swap.members.forEach(await updateSwapMember);
      res.status(200).json({
        receivedPlaylistId: ownersNewPlaylistId,
      });
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
