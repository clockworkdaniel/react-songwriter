const express = require('express');

const ArtistController = require('../controllers/artist/artistController');

const router = express.Router();

router.route('/artists').get(ArtistController.getArtists);
router.route('/artist/:id').get(ArtistController.getArtist);


module.exports = router;
