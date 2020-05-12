import * as models from "../../../lib/models";

export default async function swaps(req, res) {
  const swaps = await models.swap.all();
  console.log('swaps:', swaps);
  res.status(200).json(swaps);
}
