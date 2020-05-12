import { getSession } from "../../../../lib/iron";
import * as models from "../../../../lib/models";

export default async function swaps(req, res) {
  const session = await getSession(req);
  switch (req.method) {
    case "POST":
      const swap = await models.swap.create({ owner_id: session.id });
      let swapMember = await models.swapMember.create({
        swap_id: swap.id,
        user_id: session.id,
      });
      res.writeHead(302, { Location: "/swaps" });
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

