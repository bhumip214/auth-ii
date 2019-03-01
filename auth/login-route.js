const express = require("express");
const router = express.Router();
const db = require("../database/dbConfig");
const bcrypt = require("bcryptjs");
const tokenService = require("../auth/token-service.js");

router.use(express.json());

//Create login
router.post("/", login);

async function login(req, res) {
  try {
    const { username, password } = await req.body;
    if (username && password) {
      const user = await db("users")
        .where({ username })
        .first();
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = tokenService.generateToken(user); // new

        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token,
          departments: token.departments
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
}
module.exports = router;
