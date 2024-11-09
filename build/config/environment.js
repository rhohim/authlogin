"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configFile = exports.substring = exports.port = exports.configDB = void 0;
require("dotenv/config");
exports.configDB = {
    db: process.env.DATABASE,
    host: process.env.HOST,
    user: process.env.USERDB,
    password: process.env.PASSWORD
};
exports.port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
exports.substring = process.env.SUBSTRING;
exports.configFile = {
    public_key: process.env.publicKey,
    private_key: process.env.privateKey,
    url_endpoint: process.env.urlEndpoint
};
//# sourceMappingURL=environment.js.map