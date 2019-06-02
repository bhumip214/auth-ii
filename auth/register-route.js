const express = require("express");
const router = express.Router();
const db = require("../database/dbConfig");
const bcrypt = require("bcryptjs");
const tokenService = require("../auth/token-service.js");

router.use(express.json());

//Create user and Hash the password
router.post("/", async (req, res) => {
  try {
    if (req.body.username && req.body.password && req.body.department) {
      const hash = await bcrypt.hashSync(req.body.password, 14);
      req.body.password = hash;

      const [id] = await db("users").insert(req.body);
      const user = await db("users")
        .where({ id })
        .first();

      const token = tokenService.generateToken(user);
      res.status(201).json({ user, token });
    } else {
      res.status(400).json({
        errorMessage:
          "Please provide username, password, and department to register."
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "There was an error while registering."
    });
  }
});

module.exports = router;
