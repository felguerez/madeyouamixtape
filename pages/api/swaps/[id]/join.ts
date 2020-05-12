import { getSession } from "../../../../lib/iron";
import * as models from "../../../../lib/models";

export default async function swaps(req, res) {
  const session = await getSession(req);
  switch (req.method) {
    case "POST":
      // check if user is enrolled in swap
      const swap = await models.swap.getById(req.query.id);
      const { members } = swap;
      if (members.find((member) => (member.user_id = session.id))) {
        res.status(409).json({ message: "You're already enrolled" });
      }
      let swapMember = await models.swapMember.create({
        swap_id: req.query.id,
        user_id: session.id,
      });
      res.writeHead(302, { Location: `/swaps/${req.query.id}` });
      res.end();
      break;
    default:
      console.log("ERROR unhandled method ", req.method);
  }
}
