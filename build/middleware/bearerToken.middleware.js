"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateAndAuthorize = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const connectDB_1 = __importDefault(require("../utils/connectDB"));
const auth_service_1 = require("../services/auth.service");
const authenticateAndAuthorize = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).send({ message: 'Unauthorized Bearer' });
        return;
    }
    if ((0, auth_service_1.checkTokenBlacklisted)(authHeader.split(' ')[1])) {
        res.status(401).json({ message: 'Token has been invalidated' });
        return;
    }
    const token = authHeader.slice(7);
    const decoded = jsonwebtoken_1.default.decode(token);
    if (!token || token === 'null') {
        res.status(403).send({ message: 'Forbidden: Token is null' });
        return;
    }
    if (decoded) {
        if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
            res.status(401).send({ message: 'Unauthorized: Token has expired' });
            return;
        }
        const sql = 'SELECT password FROM user WHERE password = ?';
        connectDB_1.default.query(sql, [decoded.password], (error, results) => {
            if (error) {
                console.error('Database error:', error);
                res.status(500).send({ message: 'Server error' });
                return;
            }
            if (results.length === 0) {
                res.status(403).send({ message: 'Forbidden: User not found' });
                return;
            }
            const storedPassword = results[0].password;
            try {
                if (storedPassword === decoded.password) {
                    return next();
                }
                else {
                    res.status(403).send({ message: 'Forbidden: Invalid credentials' });
                }
            }
            catch (error) {
                console.error('Authentication error:', error);
                res.status(401).send({ message: 'Unauthorized' });
            }
        });
    }
};
exports.authenticateAndAuthorize = authenticateAndAuthorize;
//# sourceMappingURL=bearerToken.middleware.js.map