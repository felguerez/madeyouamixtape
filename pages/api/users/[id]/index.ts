import * as models from "../../../../lib/models";
import { getSession } from "../../../../lib/iron";

export default async (req, res) => {
  const sessionUser = await getSession(req);
  switch (req.method) {
    case "PUT":
      const { display_name } = req.body;
      await models.user.update({
        display_name,
        id: req.query.id,
      });
      res.status(200).json({});
      break;
  }
};
