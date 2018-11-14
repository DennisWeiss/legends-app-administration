const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {

  const token = req.headers.authorization.split(" ")[1];

  if(!token) {
    return res.status(401).send('Missing jsonwebtoken!');
  }

  const key = config.get('jwtPrivateKey');

  const result = jwt.verify(token, key);

  if(!result) {
    return res.status(401).send('Authentication failed!');
  }

  //add user to request-object
  req['user'] = result;

  next();
}
