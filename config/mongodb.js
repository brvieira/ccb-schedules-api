"use strict";

const MongoClient = require("mongodb").MongoClient;
const uri = process.env.DB_URI;
const client = new MongoClient(uri, { useUnifiedTopology: true });

module.exports = client.connect().then((conn) => conn.db());
