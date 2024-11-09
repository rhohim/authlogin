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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserByIdService = exports.deleteUserByIdService = exports.getUserByIdService = exports.deleteAllUserService = exports.postUserService = exports.getallUserService = void 0;
const connectDB_1 = __importDefault(require("../utils/connectDB"));
const getallUserService = () => __awaiter(void 0, void 0, void 0, function* () {
    const sql = 'SELECT * FROM user';
    return new Promise((resolve, reject) => {
        connectDB_1.default.query(sql, (error, result) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(result);
            }
        });
    });
});
exports.getallUserService = getallUserService;
const postUserService = (username, fullname, email, password, created, updated, last_login) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = 'INSERT INTO user (username, fullname, email, password, created, updated, last_login) VALUES (?,?,?,?,?,?,?)';
    const values = [username, fullname, email, password, created, updated, last_login];
    return new Promise((resolve, reject) => {
        connectDB_1.default.query(sql, values, (error, result) => {
            if (error) {
                reject(error);
            }
            else {
                resolve({
                    id: result.insertId,
                    username,
                    fullname,
                    email,
                    password,
                    created,
                    updated,
                    last_login,
                });
            }
        });
    });
});
exports.postUserService = postUserService;
const deleteAllUserService = () => __awaiter(void 0, void 0, void 0, function* () {
    const sql = 'DELETE FROM user';
    return new Promise((resolve, reject) => {
        connectDB_1.default.query(sql, (error, result) => {
            if (error) {
                console.error('Error Deleting User: ', error);
                return reject(error);
            }
            const resetAutoIncrement = 'ALTER TABLE User AUTO_INCREMENT = 1';
            connectDB_1.default.query(resetAutoIncrement, (error, result) => {
                if (error) {
                    console.error('Error resetting auto-increment counter: ', error);
                    return reject(error);
                }
                resolve();
            });
        });
    });
});
exports.deleteAllUserService = deleteAllUserService;
const getUserByIdService = (UserId) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = 'SELECT * FROM user WHERE id = ?';
    return new Promise((resolve, reject) => {
        connectDB_1.default.query(sql, [UserId], (error, result) => {
            if (error) {
                console.error('Error Fetching User: ', error);
                return reject(error);
            }
            if (result.length === 0) {
                return reject(new Error('User Not Found'));
            }
            resolve(result[0]);
        });
    });
});
exports.getUserByIdService = getUserByIdService;
const deleteUserByIdService = (UserId) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = 'DELETE FROM user WHERE id = ?';
    return new Promise((resolve, reject) => {
        connectDB_1.default.query(sql, [UserId], (error, result) => {
            if (error) {
                console.error('Error Deleting User: ', error);
                return reject(error);
            }
            if (result.affectedRows === 0) {
                return reject(new Error('User Not Found'));
            }
            resolve();
        });
    });
});
exports.deleteUserByIdService = deleteUserByIdService;
const updateUserByIdService = (UserId, UserData) => __awaiter(void 0, void 0, void 0, function* () {
    const fetchSql = 'SELECT username, fullname, email, password, created, updated, last_login FROM user WHERE id = ?';
    return new Promise((resolve, reject) => {
        connectDB_1.default.query(fetchSql, [UserId], (fetchError, fetchResult) => {
            if (fetchError) {
                console.error('Error Fetching User Details: ', fetchError);
                return reject(fetchError);
            }
            if (fetchResult.length === 0) {
                return reject(new Error('User Not Found'));
            }
            const existingValues = fetchResult[0];
            const updateUsername = UserData.username !== undefined ? UserData.username : existingValues.username;
            const updateFullname = UserData.fullname !== undefined ? UserData.fullname : existingValues.fullname;
            const updateEmail = UserData.email !== undefined ? UserData.email : existingValues.email;
            const updatePassword = UserData.password !== undefined ? UserData.password : existingValues.password;
            const updateCreated = UserData.created !== undefined ? UserData.created : existingValues.created;
            const updateUpdated = UserData.updated !== undefined ? UserData.updated : existingValues.updated;
            const updateLast_login = UserData.last_login !== undefined ? UserData.last_login : existingValues.last_login;
            const updateSql = 'UPDATE User SET username = ?, fullname = ?, email= ?, password= ?, created= ?, updated= ?, last_login= ? WHERE id = ?';
            const values = [updateUsername, updateFullname, updateEmail, updatePassword, updateCreated, updateUpdated, updateLast_login, UserId];
            connectDB_1.default.query(updateSql, values, (error, result) => {
                if (error) {
                    console.error('Error Updating User: ', error);
                    return reject(error);
                }
                resolve({
                    id: UserId,
                    username: updateUsername,
                    fullname: updateFullname,
                    email: updateEmail,
                    // password : updatePassword,
                    created: updateCreated,
                    updated: updateUpdated,
                    last_login: updateLast_login
                });
            });
        });
    });
});
exports.updateUserByIdService = updateUserByIdService;
//# sourceMappingURL=user.service.js.map