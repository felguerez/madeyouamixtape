import passport from "passport";
import nextConnect from "next-connect";
import { authenticate } from "../../../lib/passport-authenticate";

export default nextConnect()
  .use(passport.initialize())
  .get(async (req, res) => {
    authenticate("spotify", req, res).then(() => {
      res.status(200).json({});
    });
  });
