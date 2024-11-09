"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkTokenBlacklisted = exports.logoutUser = exports.postAuthService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const environment_1 = require("../config/environment");
const connectDB_1 = __importDefault(require("../utils/connectDB"));
const logger_1 = require("../utils/logger");
const tokenBlacklist = new Set();
const postAuthService = (username, password) => {
    const TOKEN_EXP = '1h';
    const substringToRemove = environment_1.substring || '';
    const sql = 'SELECT * FROM user WHERE username = ?';
    return new Promise((resolve, reject) => {
        connectDB_1.default.query(sql, [username], (error, result) => {
            if (error) {
                console.error('Database Error:', error);
                return reject(new Error('Server error'));
            }
            if (result.length === 0) {
                return resolve('Username not found');
            }
            const user = result[0];
            const originalString = user.password;
            const pass = originalString.replace(substringToRemove, '');
            bcrypt_1.default.compare(password, pass, (err, isMatch) => {
                if (err) {
                    console.error('Error Comparing Passwords:', err);
                    return reject(new Error('Server error'));
                }
                if (!isMatch) {
                    return resolve('Invalid credentials');
                }
                const secretKey = `${username}:${password}:${new Date().getTime()}`;
                const token = jsonwebtoken_1.default.sign({ userId: user.id, password: user.password }, secretKey, { expiresIn: TOKEN_EXP });
                resolve(token);
            });
        });
    });
};
exports.postAuthService = postAuthService;
const logoutUser = (token) => {
    tokenBlacklist.add(token);
    logger_1.logger.info('User logged out and token invalidated');
};
exports.logoutUser = logoutUser;
const checkTokenBlacklisted = (token) => {
    return tokenBlacklist.has(token);
};
exports.checkTokenBlacklisted = checkTokenBlacklisted;
//# sourceMappingURL=auth.service.js.map