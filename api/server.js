const express = require("express");
const ConfigureMiddleware = require("./middleware.js");

const usersRoute = require("../users/users-route");
const registerRoute = require("../auth/register-route");
const loginRoute = require("../auth/login-route");

const server = express();

ConfigureMiddleware(server);

server.use("/api/users/", usersRoute);
server.use("/api/register/", registerRoute);
server.use("/api/login/", loginRoute);

server.get("/", (req, res) => {
  res.send(`<h2> Lambda - Authentication II Project </h2>`);
});

module.exports = server;
