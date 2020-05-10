import * as models from "../../../lib/models";

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      const swap = await models.swap.getById(req.query.id);
      const owner = await models.spotifyUser.getById(swap.owner_id);
      // @ts-ignore
      const members = await models.swapMember.getBySwapId(swap.id);
      res.status(200).json({ swap, owner, members });
      break;
    default:
      console.log("ERROR unhandled method ", req.method);
  }
};
