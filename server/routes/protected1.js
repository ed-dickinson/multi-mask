const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

require('dotenv').config()
const JWTsecret = process.env.JWT_SECRET;
// const auth = require('../auth')
const User = require('../models/User');
//@route    GET api/auth
//@desc     Get logged in user
//@access   Private
router.get('/', (req,res) => {
  res.json({message: 'Welcome to protection'});

});
//@route    POST api/auth
//@desc     Auth user and get token(login)
//@access   Public
router.post('/action', verifyToken, (req,res) => {
  jwt.verify(req.token, 'secretKey', (err, authData) => {
    if(err) {

      res.sendStatus(403);
    } else {
      res.json({
        message: 'Access granted...',
        // authData
      });
    }
  });
});

router.post('/login', (req, res) => {
  // Mock user
  const user = {
    id: 1,
    username: 'brad',
    email: 'brad@gmail.com'
  }

  jwt.sign({user: user}, 'secretkey', (err, token) => { // { expiresIn: '30s' },
    res.json({
      token: token
    });
  });
});

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;//bearToken
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }

}

module.exports = router;
