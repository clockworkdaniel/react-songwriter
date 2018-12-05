var express = require('express');

var AuthorController = require('../controllers/authorController');

var router = express.Router();

router.route('/authors').get(AuthorController.getAuthors);

router.route('/author/create').post(AuthorController.postAuthor);

router.route('/author/:id').get(AuthorController.getAuthor);
router.route('/author/:id/update').put(AuthorController.putAuthor);
router.route('/authpr/:id/delete').delete(AuthorController.deleteAuthor);

module.exports = router;
