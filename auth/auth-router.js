const bcryptjs = require('bcryptjs');
const router = require('express').Router();

const Users = require('../users/users-model');

router.post('/register', (req, res) => {
  // implement registration
  let creds = req.body;
  const rounds = process.env.HASH_ROUNDS || 4;

  const hash = bcryptjs.hashSync(creds.password, rounds);

  creds.password = hash;

  Users.add(creds)
    .then((saved) => {
      console.log(saved);
      res.status(201).json({ data: saved });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error.message });
    });
});

router.post('/login', (req, res) => {
  // implement login
  const { username, password } = req.body;

  Users.findBy({ username })
    .then((users) => {
      const user = users[0];
      if (user && bcryptjs.compareSync(password, user.password)) {
        req.session.loggedIn = true;
        req.session.username = user.username;

        res.status(200).json({ message: 'welcome', session: req.session });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

module.exports = router;
