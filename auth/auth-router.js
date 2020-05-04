const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../Users/users-model');
const { jwtsecret } = require('../secrets');


router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(200).json(saved)
    })
    .catch(err => {
      res.status(500).json(err)
    })
});

router.post('/login', (req, res) => {
  // implement login
  let { username, password } = req.body;

  Users.findBy({ username })
    // .first()
    .then(user => {
      console.log('user', user)
      console.log('password', password)
      if (user && bcrypt.compareSync(password, user.password)) {

        const token = generateToken(user);
        console.log('token:', token)
        res.status(200).json({ message: `Welcome ${user.username}`, token })

      } else {

        res.status(401).json({ messge: 'Invalid credentials' })

      }
    })
    .catch(err => res.status(500).json(err))
});

function generateToken(user) {
  const payload = {
    username: user.username
  }
  const options = {
    expiresIn: '1h'
  }
  return jwt.sign(payload, jwtsecret, options)
}

module.exports = router;