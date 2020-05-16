import * as models from "../../../../lib/models";

export default async (req, res) => {
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
