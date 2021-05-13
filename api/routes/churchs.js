"use strict";

const express = require("express");
const router = express.Router();

function churchs(db) {
  const churchsController = require("../controllers/churchs")(db);

  /* 
    The expected columns are: codigo, cidade, bairro, mapa
  */
  router.post("/csv/upload", async (req, res) => {
    try {
      const csvString = req.body;
      const result = await churchsController.processCsv(csvString);
      res.send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  });

  router.get("/", async (req, res) => {
    try {
      const result = await churchsController.getAllChurchs();
      res.send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  });

  router.get("/active", async (req, res) => {
    try {
      const result = await churchsController.getActiveChurchs();
      res.send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  });

  router.get("/active/cities", async (req, res) => {
    try {
      const result = await churchsController.getActiveChurchsCities();
      res.send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  });

  return router;
}

module.exports = churchs;
