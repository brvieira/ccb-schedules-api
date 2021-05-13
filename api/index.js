module.exports = (db, server) => {
  server.use("/service", require("./routes/services")(db));
  server.use("/lane", require("./routes/lane")(db));
  server.use("/users", require("./routes/users")(db));
  server.use("/messages", require("./routes/messages")(db));
  server.use("/churchs", require("./routes/churchs")(db));
};
