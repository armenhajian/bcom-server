const _ = require('lodash');
const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User');

router.post('/authenticate', authenticate);
router.post('/register', register);

module.exports = router;

function authenticate(req, res) {

  User.findOne({email: req.body.email}).then(user => {
    if (user && bcrypt.compareSync(req.body.password, user.hash)) {
      const token = jwt.sign(_.omit(user, 'hash'), config.secret);
      res.send({token: token});
    } else {
      // authentication failed
      res.status(401).send('Username or password is incorrect');
    }
  }).catch(err => {
    console.log(err);
    res.status(400).send(err)
  });
}

function register(req, res) {
  const userParam = _.omit(req.body, 'password');
  console.log(userParam, req.body);
  userParam.hash = bcrypt.hashSync(req.body.password, 10);

  const user = new User(userParam);
  user.save().then(function () {
      res.sendStatus(200);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}