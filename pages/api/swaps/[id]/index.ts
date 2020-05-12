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
  const owner = await models.spotifyUser.getById(swap.owner_id);
  const swapMembers = await models.swapMember.getBySwapId(swap.id);
  const currentSwapMember = swapMembers.filter(
    (swapMember) => swapMember.user_id === sessionUser.id
  )[0];
  const isOwner =
    currentSwapMember !== undefined &&
    currentSwapMember.user_id === swap.owner_id;
  const swapMemberUsers = await models.user.getByIds(
    swapMembers.map((member) => member.id)
  );
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
