import app from "./app";
import { PrismaClient } from "@prisma/client";
import logger from "./utils/logger";

const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

process.on("SIGTERM", () => {
  server.close(async () => {
    await prisma.$disconnect();
    logger.info("Server closed");
  });
});

export default server;
