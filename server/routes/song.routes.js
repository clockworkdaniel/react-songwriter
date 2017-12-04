//import express from 'express';
const express = require('express');
//import * as SongController from '../controllers/song.controller.js';

//import songs from '../mock/songbook.json';
const songs = require('../mock/songbook.json');

var router = express.Router();

router.get('/songs', function(req, res) {
	res.json(songs);
});


// router.route('/songs').get(SongController.getSongs);

// router.route('/songs/:id').get(SongController.getSong);

// router.route('/songs/:id').post(SongController.postSong);

// router.route('/songs/:id').put(SongController.putSong);

// router.route('/songs/:id').delete(SongController.deleteSong);

//export default router;
module.exports = router;