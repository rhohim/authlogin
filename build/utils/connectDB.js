"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
const environment_1 = require("../config/environment");
function creatConnection() {
    const db = mysql2_1.default.createConnection({
        host: environment_1.configDB.host,
        user: environment_1.configDB.user,
        password: environment_1.configDB.password,
        database: environment_1.configDB.db
    });
    db.on('error', function (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Connection lost, reconnecting...');
            handleReconnect();
        }
        else {
            throw err;
        }
    });
    return db;
}
function handleReconnect() {
    const db = creatConnection();
    setInterval(() => {
        db.query('SELECT 1', (err) => {
            if (err) {
                console.error('Keep-alive query failed', err);
                handleReconnect();
            }
            else {
                console.log('Keep-alive query sent');
            }
        });
    }, 1000 * 60 * 60);
    return db;
}
const db = handleReconnect();
exports.default = db;
//# sourceMappingURL=connectDB.js.map