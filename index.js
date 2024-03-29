"use strict";
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const server = express();

server.use(cors());
server.use(bodyParser.json());

const path = require("path");
const scriptName = path.basename(__filename);

const logger = require("./config/logger")(scriptName);

const port = process.env.PORT;

const conn = require("./config/mongodb");

conn.then(async (db) => {
  require("./api")(db, server);
  server.listen(port, () => logger.info(`Server running on ${port}`));
});
