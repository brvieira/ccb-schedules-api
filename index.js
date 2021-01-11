"use strict";
require("dotenv").config();

const path = require("path");
const scriptName = path.basename(__filename);

const server = require("./config/express");
const logger = require("./config/logger")(scriptName);

const port = process.env.PORT;

const conn = require("./config/mongodb");

conn.then((db) => {
  console.log(db);
  server.listen(port, () => logger.info(`Server running on ${port}`));
});
