import passport from "passport";
import nextConnect from "next-connect";
import { authenticate } from "../../../lib/passport-authenticate";

export default nextConnect()
  .use(passport.initialize())
  .get((req, res) => {
    console.log("authenticating ...");
    authenticate("spotify", req, res).catch((err) => {
      console.log(err);
      res.status(401).json({ error: err });
    });
    res.status(200).json({});
  });
