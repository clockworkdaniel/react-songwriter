const express = require('express');

const UserController = require('../controllers/user/userController');

const router = express.Router();

router.route('/user/create').post(UserController.createUser);
router.route('/user/sign-in').post(UserController.userSignIn);
router.route('/user/sign-out').post(UserController.userSignOut);

module.exports = router;
