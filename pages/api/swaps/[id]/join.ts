import { getSession } from "../../../../lib/iron";
import * as models from "../../../../lib/models";
import * as db from "../../../../lib/db";
import escape from "sql-template-strings";

export default async function swaps(req, res) {
  const session = await getSession(req);
  switch (req.method) {
    case "POST":
      // check if user is enrolled in swap
      const swap = await models.swap.getById(req.query.id);
      const { members } = swap;
      const existingMember = members.find(
        (member) => member.user_id === session.id
      );
      if (existingMember) {
        res.writeHead(302, {
          Location: `/swaps/${req.query.id}`,
        });
        res.end();
        return;
      }
      await models.swapMember.create({
        swap_id: req.query.id,
        user_id: session.id,
      });
      // TODO: respond with 200
      // TODO: make request via XHR
      res.writeHead(302, { Location: `/swaps/${req.query.id}` });
      res.end();
      break;
    default:
      console.log("ERROR unhandled method ", req.method);
  }
}
