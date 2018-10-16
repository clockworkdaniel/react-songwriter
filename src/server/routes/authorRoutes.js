var express = require('express');

var AuthorController = require('../controllers/authorController');

var router = express.Router();

router.route('/authors').get(AuthorController.getAuthors);

router.route('/author/create').get(AuthorController.postAuthor);

router.route('/author/:id').get(AuthorController.getAuthor);
router.route('/author/:id/update').get(AuthorController.putAuthor);
router.route('/authpr/:id/delete').get(AuthorController.deleteAuthor);

module.exports = router;
