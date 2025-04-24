import express from "express";
import cors from "cors";
import helmet from "helmet";
import { Logger } from "./helpers/logger";

// PORT we will listen on
const PORT = process.env.PORT || 2019;
const logger = new Logger();
const server = express();
server.use(helmet());
server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
    logger.info("GET /");
    res.status(200).json({ Hello: "World!" });
});

// Create serverInstance so we can connect via webSocket
const serverInstance = server.listen(PORT, () =>
    logger.info(`\n=== Listening on post ${PORT} ===\n`),
);

// Connect via webSocket
// const io = socket(serverInstance);
// io.on("connection", () => {logger.info("connected!")});
logger.info("io socket ready");
