"use strict";

module.exports = (instance) => {
  const LOG_LEVEL = process.env.LOG_LEVEL;

  const log4js = require("log4js");
  const logger = log4js.getLogger(instance);

  logger.level = LOG_LEVEL;

  return logger;
};
