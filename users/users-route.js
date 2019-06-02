const express = require("express");
const router = express.Router();
const db = require("../database/dbConfig");
const restricted = require("../auth/restricted-middleware.js");

router.use(express.json());

//Get users only if the user is logged in
router.get("/", restricted, async (req, res) => {
  try {
    const users = await db("users").where(
      "department",
      req.decodedJwt.departments
    );
    res.status(200).json(users);
  } catch (error) {
    res.status(401).json({
      message: "You shall not pass!"
    });
  }
});

module.exports = router;
