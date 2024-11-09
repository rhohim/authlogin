"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenTest = exports.logoutController = exports.postAuthController = void 0;
const auth_service_1 = require("../services/auth.service");
const postAuthController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const result = yield (0, auth_service_1.postAuthService)(username, password);
        if (result === 'Username not found') {
            res.status(404).send({ message: 'Username not found' });
            return;
        }
        if (result === 'Invalid credentials') {
            res.status(401).send({ message: 'Invalid credentials' });
            return;
        }
        res.status(200).send({ token: result });
    }
    catch (error) {
        console.error('Authentication Error:', error);
        res.status(500).send({ message: 'Internal server error' });
    }
});
exports.postAuthController = postAuthController;
const logoutController = (req, res) => {
    var _a;
    const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        res.status(400).send({ message: 'Token is required' });
        return;
    }
    (0, auth_service_1.logoutUser)(token);
    res.status(200).send({ message: 'Logged out successfully' });
};
exports.logoutController = logoutController;
const getTokenTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).send({ message: 'Token can be used' });
});
exports.getTokenTest = getTokenTest;
//# sourceMappingURL=auth.controller.js.map