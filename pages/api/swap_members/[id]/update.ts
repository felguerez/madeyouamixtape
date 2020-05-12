import { getSession } from "../../../../lib/iron";
import * as models from "../../../../lib/models";

export default async function swapMembers(req, res) {
  const session = await getSession(req);
  switch (req.method) {
    case "POST":
      const body = JSON.parse(req.body);
      await models.swapMember.update({
        id: req.query.id,
        selected_playlist_id: body.selected_playlist_id,
      });
      res.status(200);
      res.end();
      break;
    case "GET":
      const swapsByUserId = await models.swap.getSwapsByUserId(session.id);
      res.status(200).json(swapsByUserId);
      break;
    default:
      console.log("ERROR unhandled method ", req.method);
  }
}
