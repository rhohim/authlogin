"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const route_1 = require("./routes/route");
const logger_1 = require("./utils/logger");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const environment_1 = require("./config/environment");
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});
(0, route_1.routes)(app);
app.use('/', (req, res, next) => {
    res.status(200).json({
        message: 'Typescript'
    });
});
// app.listen(port, () => logger.info(`Server listening on port ${port}`))
const server = app.listen(environment_1.port, () => logger_1.logger.info(`Server listening on port ${environment_1.port}`));
server.timeout = 300000;
//# sourceMappingURL=index.js.map