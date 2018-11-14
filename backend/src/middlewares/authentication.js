const jwt = require("jsonwebtoken");
const appConf = require("../../app-conf");

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send("Missing jsonwebtoken!");
  }

  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).send("Missing jsonwebtoken!");
  }

  const key = appConf.jwtPrivateKey;

  //result contains payload of token
  let result = null;
  try {
    result = jwt.verify(token, key);
  } catch (err) {
    return res.status(401).send({ message: "Invalid token!", error: err });
  }

  if (!result) {
    return res.status(401).send("Authentication failed!");
  }

  //add user to request-object
  req["user"] = result;

  next();
};
