"use strict";

const express = require("express");
const router = express.Router();

function lane(db) {
  const laneController = require("../controllers/lane")(db);

  router.post("/", async (req, res) => {
    try {
      const { body } = req;
      const data = await laneController.createNumberToService(body);
      res.send(data);
    } catch (error) {
      res.sendStatus(500);
    }
  });

  router.get("/", async (req, res) => {
    try {
      const data = await servicesController.listAllServices();
      res.send(data);
    } catch (error) {
      res.sendStatus(500);
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const data = await servicesController.getService(id);
      res.send(data);
    } catch (error) {
      res.sendStatus(500);
    }
  });

  router.get("/type/:type", async (req, res) => {
    try {
      const { type } = req.params;
      const data = await servicesController.getServiceByType(type);
      res.send(data);
    } catch (error) {
      res.sendStatus(500);
    }
  });

  router.get("/available/:type", async (req, res) => {
    try {
      const { type } = req.params;
      const data = await servicesController.getServiceAvailableByType(type);
      res.send(data);
    } catch (error) {
      res.sendStatus(500);
    }
  });

  router.put("/", async (req, res) => {
    try {
      const { body } = req;
      const data = await servicesController.updateService(body);
      res.send(data);
    } catch (error) {
      res.sendStatus(500);
    }
  });

  router.delete("/number/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const data = await laneController.deleteNumberToService(id);
      res.send(data);
    } catch (error) {
      res.sendStatus(500);
    }
  });

  return router;
}

module.exports = lane;
