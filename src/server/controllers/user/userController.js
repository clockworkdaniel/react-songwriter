const bcrypt = require('bcrypt');
const User = require('../../models/user');

exports.createUser = function createUser(req, res) {
  const user = req.body;
  const { username, email, password } = user;
  User.create({ username, email, password }, (err, createdUser) => {
    if (err) {
      // actually this shouldn't necessarily be a 500, change
      return res.status(500).json({ message: err.message });
    }
    req.session.userId = createdUser._id;
    // save required as express session doesn't auto save on POST response
    req.session.save();
    res.status(201).json({ message: 'User created' });
  });
};

exports.userSignIn = function userSignIn(req, res) {
  const user = req.body;
  const { usernameOrEmail, password } = user;
  const userSignInObj = (() => {
    if (usernameOrEmail.includes('@')) {
      return { email: usernameOrEmail };
    }
    return { username: usernameOrEmail };
  })();

  User.findOne(userSignInObj).exec((err, foundUser) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    if (!foundUser) {
      return res.status(404).json({ message: 'User does not exist' });
    }
    bcrypt.compare(password, foundUser.password, (err, result) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      if (result === false) {
        return res.status(401).json({ message: 'Wrong password' });
      }
      req.session.userId = foundUser._id;
      // save required as express session doesn't auto save on POST response
      req.session.save();
      res.status(200).json({ message: 'Sign in successful' });
    });
  });
};

exports.userSignOut = function userSignOut(req, res) {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        // wrong status
        return res.status(500).json({ message: err.message });
      }
      // express session wasn't auto expiring cookie, perhaps for same reason mentioned above
      res.status(200).clearCookie('connect.sid').json({ message: 'Sign out successful' });
    });
  }
};
