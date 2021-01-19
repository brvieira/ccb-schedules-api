"use strict";

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  const usersController = require("../controllers/users")(db);

  router.post("/newUser", async (req, res) => {
    res.send(await usersController.newUser(req.body));
  });

  router.post("/login", async (req, res) => {
    res.send(await usersController.login(req.body));
  });

  router.post("/editUser", async (req, res) => {
    res.send(await usersController.editUser(req.body));
  });

  return router;
};
