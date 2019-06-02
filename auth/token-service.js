const jwt = require("jsonwebtoken"); // 1. install this library

const secrets = require("../config/secrets.js");

function generateToken(user) {
  const payload = {
    subject: user.id, // sub in payload is what the token is about
    username: user.username,
    departments: user.department
    // ...otherData
  };

  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = {
  generateToken
};
