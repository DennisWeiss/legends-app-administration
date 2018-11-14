const express = require("express");
const router = express.Router();

const User = require("../models/user");
const appConf =  require("../../app-conf");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
  const token = jwt.sign(
    { username: user.username, _id: user._id },
    key,
    { expiresIn: "1h" }
  );

  res.status(200).send({
    message: "Login successful",
    user: {
      _id: user._id,
      username: user.username
    },
    token: token,
    expiresIn: "3600"
  });
});

module.exports = router;
