import express from "express";
import analysisRouter from "./routes/analysis.route";
import path from "path";
import morgan from "morgan";
import logger from "./utils/logger";
import fs from "fs";
import { apiLimiter } from "./middleware/rate-limiter";
import helmet from "helmet";
const logDir = path.join(__dirname, "../logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const app = express();
app.use((req, res, next) => {
  if (
    req.hostname !== "localhost" &&
    req.headers["x-forwarded-proto"] !== "https"
  ) {
    return res.redirect(["https://", req.get("Host"), req.url].join(""));
  }
  next();
});
app.use(helmet());
// Static files - should come before your API routes
const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));
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
app.use("/api/texts", analysisRouter);
// Catch / route to serve index.html for SPA
app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});
export default app;
