import * as express from "express";

import { getArtists, getArtist } from "../controllers/artist/artistController";

const router = express.Router();

router.route("/artists").get(getArtists);
router.route("/artist/:id").get(getArtist);

export default router;
