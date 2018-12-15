const express = require('express');

const AuthorController = require('../controllers/author/authorController');

const router = express.Router();

router.route('/authors').get(AuthorController.getAuthors);
router.route('/author/:id').get(AuthorController.getAuthor);


module.exports = router;
