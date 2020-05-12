import * as models from "../../../../lib/models";
import { getSession } from "../../../../lib/iron";
import { serialize } from "../../../../lib/utils";

export default async (req, res) => {
  const sessionUser = await getSession(req);
  if (!sessionUser) {
    res.writeHead(302, {
      Location: "/",
    });
    res.end();
  }
  const swap = await models.swap.getById(req.query.id);
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
};
