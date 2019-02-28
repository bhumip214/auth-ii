const express = require("express");
const router = express.Router();
const db = require("../database/dbConfig");
const jwt = require("jsonwebtoken");

router.use(express.json());

const secret =
  process.env.JWT_SECRET || "add a third table for many to many relationships";

//middleware
function restricted(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "You can't touch this!" });
      } else {
        req.decodedJwt = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "You shall not pass!" });
  }
}

function checkDepartment(department) {
  return function(req, res, next) {
    if (
      req.decodedJwt.departments &&
      req.decodedJwt.departments.includes(department)
    ) {
      next();
    } else {
      res.status(403).json({ you: "you have no power here!" });
    }
  };
}

//Get users only if the user is logged in
router.get("/", restricted, checkDepartment("Sales"), async (req, res) => {
  try {
    const users = await db("users");
    res.status(200).json(users);
  } catch (error) {
    res.status(401).json({
      message: "You shall not pass!"
    });
  }
});

module.exports = router;
