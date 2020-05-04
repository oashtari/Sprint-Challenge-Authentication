const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../Users/users-model');
const { jwtSecret } = require('../secrets');


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
    .first()
    .then(user => {


      if (user && bcrypt.compareSync(password, user.password)) {
        console.log('username', user.username)

        const token = generateToken(user);

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
  console.log(payload, jwtSecret, options, 'check token vars')
  return jwt.sign(payload, jwtSecret, options)
}

module.exports = router;