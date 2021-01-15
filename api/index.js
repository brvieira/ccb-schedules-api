module.exports = (db, server) => {
  server.use("/service", require("./routes/services")(db));
  server.use("/lane", require("./routes/lane")(db));
};
