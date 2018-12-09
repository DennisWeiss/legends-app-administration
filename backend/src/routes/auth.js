const express = require("express");
const router = express.Router();

const User = require("../models/user");
const appConf =  require("../../app-conf");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const auth = require('../middlewares/authentication')


router.post("/register", async (req, res, next) => {

    const hash = await bcrypt.hash(req.body.password, 10);

  const user = new User({
    username: req.body.username,
    password: hash,
  });

  try {
    const result = await user.save();
  } catch (err) {
    return res
      .status(400)
      .send({ message: "User with same username already registered!" });
  }

  res.status(201).send({
    message: "User created!",
    user: {
      _id: user._id,
      username: user.username
    }
  });

});

router.post("/login", async (req, res, next) => {
  //search if user exists
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res.status(401).send({ message: "Invalid username or password" });
  }

  //compare password to hash in db
  const match = await bcrypt.compare(req.body.password, user.password);

  if (!match) {
    return res.status(401).send({ message: "Invalid username or password" });
  }

  //private key used to sign jwt
  const key = appConf.jwtPrivateKey;

  //generate a token
  const token = user.generateAuthToken(appConf.tokenExpInSec);

  res.status(200).send({
    message: "Login successful",
    user: {
      _id: user._id,
      username: user.username,
      rights: user.rights
    },
    token: token,
    expiresIn: appConf.tokenExpInSec
  });
});

router.post('/verify', auth, async (req, res, next) => {

  const token = User.generateAuthToken(appConf.tokenExpInSec , req.user);

  res.status(200).send({
      user: req.user,
      token: token,
      expiresIn: appConf.tokenExpInSec
  })
})

module.exports = router;
