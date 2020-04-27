import * as express from "express";

import {
  getSong,
  postSong,
  putSong,
  deleteSong,
  getSongs,
  togglePrivacy
} from "../controllers/song/songController";

const router = express.Router();

router.route("/songs").get(getSongs);
router.route("/songs/:id").get(getSongs);

router.route("/song/create").post(postSong);

router.route("/song/:id").get(getSong);
router.route("/song/:id").put(putSong);
router.route("/song/:id").delete(deleteSong);
router.route("/song/:id/togglePrivacy").put(togglePrivacy);

export default router;
