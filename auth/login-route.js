const express = require("express");
const router = express.Router();
const db = require("../database/dbConfig");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.use(express.json());

const secret =
  process.env.JWT_SECRET || "add a third table for many to many relationships";

function generateToken(user) {
  const payload = {
    subject: user.id, // sub in payload is what the token is about
    username: user.username,
    roles: ["Student"]
    // ...otherData
  };

  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, secret, options);
}

//Create login
router.post("/", async (req, res) => {
  try {
    const { username, password } = await req.body;
    if (username && password) {
      const user = await db("users")
        .where({ username })
        .first();
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user); // new

        res.status(200).json({
          message: `Welcome ${user.username}!, have a token...`,
          token,
          secret,
          roles: token.roles
        });
      } else {
        res.status(401).json({ message: "You shall not pass!" });
      }
    } else {
      res.status(400).json({
        errorMessage:
          "Please provide correct username and password to register."
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "There was an error while logging in."
    });
  }
});

module.exports = router;
