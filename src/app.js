"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const analysis_route_1 = __importDefault(require("./routes/analysis.route"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const logger_1 = __importDefault(require("./utils/logger"));
const fs_1 = __importDefault(require("fs"));
const rate_limiter_1 = require("./middleware/rate-limiter");
const helmet_1 = __importDefault(require("helmet"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const authMiddleware_1 = require("./middleware/authMiddleware");
const logDir = path_1.default.join(__dirname, "../logs");
if (!fs_1.default.existsSync(logDir)) {
    fs_1.default.mkdirSync(logDir);
}
const app = (0, express_1.default)();
app.use((req, res, next) => {
    if (req.hostname !== "localhost" &&
        req.headers["x-forwarded-proto"] !== "https") {
        return res.redirect(["https://", req.get("Host"), req.url].join(""));
    }
    next();
});
app.use((0, helmet_1.default)());
// Static files - should come before your API routes
const publicPath = path_1.default.join(__dirname, "../public");
app.use(express_1.default.static(publicPath));
app.use("/api", rate_limiter_1.apiLimiter);
app.use((0, morgan_1.default)("combined", {
    stream: {
        write: (message) => logger_1.default.info(message.trim()),
    },
}));
// Your routes and other middleware
app.use(express_1.default.json());
app.use("/api/auth", auth_route_1.default);
app.use("/api/texts", authMiddleware_1.authenticate, analysis_route_1.default);
// Catch / route to serve index.html for SPA
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(publicPath, "index.html"));
});
exports.default = app;
