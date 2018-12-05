var express = require('express');

var SongController = require('../controllers/songController');

var router = express.Router();

router.route('/songs').get(SongController.getSongs);

router.route('/song/create').post(SongController.postSong);

router.route('/song/:id').get(SongController.getSong);
// router.route('/song/:id/update').get(SongController.putSong);
// router.route('/song/:id/delete').get(SongController.deleteSong);

module.exports = router;
