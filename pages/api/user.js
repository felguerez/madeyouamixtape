import { getSession } from "../../lib/iron";
import * as models from "../../lib/models";

export default async function user(req, res) {
  let session, user;
  try {
    session = await getSession(req);
    if (session) {
      user = await models.user.getById(session.id);
    }
    res.status(200).json({ user: user || null });
  } catch (e) {
    console.log("e:", e);
    res.status(500).json({ error: e });
  }
}
