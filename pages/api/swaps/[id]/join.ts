import { getSession } from "../../../../lib/iron";
import * as models from "../../../../lib/models";

export default async function swaps(req, res) {
  const session = await getSession(req);
  switch (req.method) {
    case "POST":
      let swapMember = await models.swapMember.create({
        swap_id: req.query.id,
        user_id: session.id,
      });
      res.writeHead(302, { Location: "/swaps" });
      res.end();
      break;
    default:
      console.log("ERROR unhandled method ", req.method);
  }
}
