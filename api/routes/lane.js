"use strict";

const express = require("express");
const router = express.Router();

function lane(db) {
  const laneController = require("../controllers/lane")(db);
  const serviceController = require("../controllers/services")(db);

  router.post("/", async (req, res) => {
    try {
      const { body } = req;
      const data = await laneController.createNumberToService(body);
      res.send(data);
    } catch (error) {
      res.sendStatus(500);
    }
  });

  router.get("/number/:number", async (req, res) => {
    try {
      const { number } = req.params;
      const data = await laneController.getNumbers(number);
      let result = {
        senhas: data,
      };

      if (data.length > 0) {
        const serviceId = data[0]["culto_id"];
        const service = (await serviceController.getService(serviceId))[0];

        const todayDate = getDate(new Date());

        if (service.data < todayDate) {
          result.error =
            "A senha informada é referente a um culto passado e não pode ser editada!";
        } else {
          result.service = service;
        }
      } else {
        result.error = "A senha informada não existe!";
      }

      res.send(result);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });

  router.get("/service/:id/:type", async (req, res) => {
    try {
      const { id, type } = req.params;
      const data = await laneController.getLaneByServiceAndType(id, type);
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

  router.post("/number/deleteAndCreateNew", async (req, res) => {
    try {
      const { body } = req;
      const data = await laneController.deleteAndCreateNew(body);
      res.send(data);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });

  router.put("/number", async (req, res) => {
    try {
      const { body } = req;
      const data = await laneController.updateNumbers(body);
      res.send(data);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });

  return router;
}

const getDate = (date) => {
  const day = date.getDate(),
    month = date.getMonth() + 1,
    year = date.getYear() + 1900,
    convDat = day < 10 ? `0${day}` : day,
    convMonth = month < 10 ? `0${month}` : month;

  return `${convDat}/${convMonth}/${year}`;
};

module.exports = lane;
