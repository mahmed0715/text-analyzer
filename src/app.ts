import express from "express";
import analysisRouter from "./routes/analysis.route";
import path from "path";
import morgan from "morgan";
import logger from "./utils/logger";
import fs from "fs";
import { apiLimiter } from "./middleware/rate-limiter";

const logDir = path.join(__dirname, "../logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const app = express();
app.use("/api", apiLimiter);
app.use(
  morgan("combined", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);

// Your routes and other middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
app.use("/api/texts", analysisRouter);

export default app;
