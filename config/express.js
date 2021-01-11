const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const server = express();

server.use(cors);
server.use(bodyParser.json());

module.exports = server;
