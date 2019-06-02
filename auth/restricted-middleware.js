const secrets = require("../config/secrets.js");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    // is it valid?
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        // record the event
        res.status(401).json({ you: "can't touch this!" });
      } else {
        req.decodedJwt = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ you: "shall not pass!" });
  }
};
