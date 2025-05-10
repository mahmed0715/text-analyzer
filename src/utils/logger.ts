import { createLogger, format, transports } from "winston";
const LogzioWinstonTransport = require("winston-logzio");
const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(({ level, message, timestamp }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [
    new LogzioWinstonTransport({
      token: process.env.LOGZIO_TOKEN,
      host: "listener.logz.io",
    }),
    new transports.Console(),
    new transports.File({ filename: "logs/combined.log" }),
  ],
});

export default logger;
