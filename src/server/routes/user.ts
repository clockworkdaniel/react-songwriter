import * as express from "express";

import {
  createUser,
  userSignIn,
  userSignOut,
  checkUser
} from "../controllers/user/userController";

const router = express.Router();

router.route("/user/create").post(createUser);
router.route("/user/sign-in").post(userSignIn);
router.route("/user/sign-out").post(userSignOut);
router.route("/user/check").post(checkUser);

export default router;
