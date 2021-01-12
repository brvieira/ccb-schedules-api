module.exports = (db, server) => {
  server.use("/service", require("./routes/services")(db));
};
