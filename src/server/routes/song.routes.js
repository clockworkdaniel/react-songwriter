const express = require('express');

const SongController = require('../controllers/song.controller.js');

const songs = require('../mock/songbook.json');

const router = express.Router();

router.get('/songs', function(req, res) {
	res.json(songs);
});


//router.route('/songs').get(SongController.getSongs);

router.route('/songs/:id').get(SongController.getSong);

module.exports = router;