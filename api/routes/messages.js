"use strict";

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  const controller = require("../controllers/messages")(db);

  router.post("/", async (req, res) => {
    res.send(await controller.createMessage(req.body));
  });

  router.put("/", async (req, res) => {
    res.send(await controller.updateMessage(req.body));
  });

  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    res.send(await controller.deleteMessage(id));
  });

  router.get("/last", async (req, res) => {
    res.send((await controller.getMessages())[0]);
  });

  router.get("/", async (req, res) => {
    res.send(await controller.getMessages());
  });

  return router;
};
