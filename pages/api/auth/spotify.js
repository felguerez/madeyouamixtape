import passport from "passport";
import nextConnect from "next-connect";
import { authenticate } from "../../../lib/passport-authenticate";

export default nextConnect()
  .use(passport.initialize())
  .get(async (req, res) => {
    await authenticate("spotify", req, res);
    const user = req.user;
    res.status(200).json(user);
  });
