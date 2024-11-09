"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putUserByIdController = exports.deletUserByIdController = exports.getUserByIdController = exports.deleteallUserController = exports.postUserController = exports.getallUserController = void 0;
const UserService = __importStar(require("../services/user.service"));
const logger_1 = require("../utils/logger");
const user_validation_1 = require("../validations/user.validation");
const bcrypt_1 = __importDefault(require("bcrypt"));
const getallUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 15;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    try {
        const user = yield UserService.getallUserService();
        if (user.length === 0) {
            res.status(404).send({
                message: 'User Not Found'
            });
            return;
        }
        const paginationResult = user.slice(start, end);
        const validatedData = paginationResult.map((data) => {
            const { error } = (0, user_validation_1.UserValidation)(data);
            if (error) {
                logger_1.logger.error(`Validation error: ${error.message}`);
                res.status(400).send({
                    message: 'Validation Failed',
                    error: error.message
                });
            }
            return {
                id: data.id,
                data: {
                    fullname: data.fullname,
                    email: data.email,
                    username: data.username,
                    created: data.created,
                    updated: data.updated,
                    last_login: data.last_login,
                }
            };
        });
        logger_1.logger.info(`Status 200: Get All user success`);
        res.status(200).send({
            page,
            pageSize,
            totalData: user.length,
            totalPages: Math.ceil(user.length / pageSize),
            user: validatedData,
            message: 'Success'
        });
    }
    catch (error) {
        logger_1.logger.error(`Status 500: Error Fetching user Data - ${error}`);
        res.status(500).send({
            message: 'Error Fetching user Data',
            error: error
        });
    }
});
exports.getallUserController = getallUserController;
const postUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const creationDate = new Date();
    const utcPlus7Date = new Date(creationDate.getTime() + 7 * 60 * 60 * 1000);
    const created_date = utcPlus7Date.toISOString().slice(0, 19).replace('T', ' ');
    const created = created_date;
    const { username, fullname, email, password, updated, last_login } = req.body;
    const payload = { id: 0, username, fullname, email, password, created, updated, last_login };
    const { error } = (0, user_validation_1.UserValidation)(payload);
    if (error) {
        logger_1.logger.error(`Validation error: ${error.message}`);
        res.status(400).send({
            message: 'Validation Failed',
            error: error.message
        });
        return;
    }
    try {
        const hashedPassword = yield bcrypt_1.default.hash(password, 12);
        const newUser = yield UserService.postUserService(username, fullname, email, hashedPassword + 'dULl98s', created, updated, last_login);
        logger_1.logger.info(`User created`);
        res.status(200).send({
            message: 'User Created Successfully',
            UserId: newUser.id
        });
    }
    catch (error) {
        res.status(500).send({
            message: 'Error Inserting User',
            error: error
        });
    }
});
exports.postUserController = postUserController;
const deleteallUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield UserService.deleteAllUserService();
        logger_1.logger.info('All user deleted successfully');
        res.status(200).send({
            message: 'All user Deleted Successfully'
        });
    }
    catch (error) {
        res.status(500).send({
            message: 'Error Deleteing All Category',
            error: error
        });
    }
});
exports.deleteallUserController = deleteallUserController;
const getUserByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const UserId = parseInt(req.params.id);
    if (isNaN(UserId)) {
        res.status(400).send({ message: 'Invalid User ID' });
        return;
    }
    try {
        const User = yield UserService.getUserByIdService(UserId);
        logger_1.logger.info(`Fetched User with ID: ${UserId}`);
        const { error } = (0, user_validation_1.UserValidation)(User);
        if (error) {
            logger_1.logger.error(`Validation error for User ID ${UserId}: ${error.message}`);
            res.status(400).send({
                message: 'Validation Failed',
                error: error.message
            });
            return;
        }
        res.status(200).send({
            id: User.id,
            data: {
                fullname: User.fullname,
                email: User.email,
                username: User.username,
                created: User.created,
                updated: User.updated,
                last_login: User.last_login,
            },
            message: 'Success'
        });
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.message === 'User Not Found') {
                res.status(404).send({ message: 'User Not Found' });
            }
            else {
                logger_1.logger.error(`Error fetching User: ${error.message}`);
                res.status(500).send({
                    message: 'Error Fetching User',
                    error: error.message || error
                });
            }
        }
    }
});
exports.getUserByIdController = getUserByIdController;
const deletUserByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
        res.status(400).send({ message: 'Invalid user ID' });
        return;
    }
    try {
        yield UserService.deleteUserByIdService(userId);
        logger_1.logger.info(`Deleted user with ID: ${userId}`);
        res.status(200).send({
            message: 'Deleted'
        });
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.message === 'user Not Found') {
                res.status(404).send({ message: 'user Not Found' });
            }
            else {
                logger_1.logger.error(`Error deleting user: ${error.message}`);
                res.status(500).send({
                    message: 'Error Deleting user',
                    error: error.message
                });
            }
        }
        else {
            logger_1.logger.error(`Unexpected error: ${String(error)}`);
            res.status(500).send({
                message: 'Unexpected Error Deleting user',
                error: String(error)
            });
        }
    }
});
exports.deletUserByIdController = deletUserByIdController;
const putUserByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.id);
    const creationDate = new Date();
    const utcPlus7Date = new Date(creationDate.getTime() + 7 * 60 * 60 * 1000);
    const updated_date = utcPlus7Date.toISOString().slice(0, 19).replace('T', ' ');
    const userData = req.body;
    userData['id'] = userId;
    userData['updated'] = updated_date;
    if (isNaN(userId)) {
        res.status(400).send({ message: 'Invalid user ID' });
        return;
    }
    const { error } = (0, user_validation_1.UserValidation)(userData);
    if (error) {
        logger_1.logger.error(`Validation error for user update: ${error.message}`);
        res.status(400).send({
            message: 'Validation Failed',
            error: error.message
        });
        return;
    }
    try {
        const updateduser = yield UserService.updateUserByIdService(userId, userData);
        logger_1.logger.info(`Updated user with ID: ${userId}`);
        res.status(200).send({
            message: 'Update Successful',
            user: updateduser
        });
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.message === 'user Not Found') {
                res.status(404).send({ message: 'user Not Found' });
            }
            else {
                logger_1.logger.error(`Error updating user: ${error.message}`);
                res.status(500).send({
                    message: 'Error Updating user',
                    error: error.message
                });
            }
        }
        else {
            logger_1.logger.error(`Unexpected error: ${String(error)}`);
            res.status(500).send({
                message: 'Unexpected Error Updating user',
                error: String(error)
            });
        }
    }
});
exports.putUserByIdController = putUserByIdController;
//# sourceMappingURL=user.controller.js.map