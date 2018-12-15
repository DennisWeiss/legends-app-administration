const jwt = require("jsonwebtoken");
const appConf = require("../../app-conf");

module.exports = (req, res, next) => {

const errMsg = { message: "Authentication failed, please login again!" };

  if (!req.headers.authorization) {
    return res.status(401).send(errMsg);
  }

  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).send(errMsg);
  }

  const key = appConf.jwtPrivateKey;

  //result contains payload of token
  let result = null;
  try {
    result = jwt.verify(token, key);
  } catch (err) {
    return res.status(401).send({message: errMsg.message, error: err});
  }

  //add user to request-object
  req["user"] = result;

  next();
};
