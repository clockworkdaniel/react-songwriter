var express = require('express');

var AuthorController = require('../controllers/authorController');

var router = express.Router();

router.route('/authors').get(AuthorController.getAuthors);
router.route('/author/:id').get(AuthorController.getAuthor);


module.exports = router;
