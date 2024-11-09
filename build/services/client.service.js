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
exports.putClientByIdService = exports.deleteClientByIdService = exports.getClientByIdService = exports.deleteAllClientService = exports.postClientService = exports.getallClientService = void 0;
const connectDB_1 = __importDefault(require("../utils/connectDB"));
const getallClientService = () => __awaiter(void 0, void 0, void 0, function* () {
    const sql = 'SELECT * FROM client';
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
exports.getallClientService = getallClientService;
const postClientService = (client_name, client_image_URL) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = 'INSERT INTO client (client_name, client_image) VALUES (?,?)';
    const values = [client_name, client_image_URL];
    return new Promise((resolve, reject) => {
        connectDB_1.default.query(sql, values, (error, result) => {
            if (error) {
                reject(error);
            }
            else {
                resolve({
                    id: result.insertId,
                    client_name: client_name,
                    client_image: client_image_URL
                });
            }
        });
    });
});
exports.postClientService = postClientService;
const deleteAllClientService = () => __awaiter(void 0, void 0, void 0, function* () {
    const sql = 'DELETE FROM client';
    return new Promise((resolve, reject) => {
        connectDB_1.default.query(sql, (error, result) => {
            if (error) {
                return reject(error);
            }
            const resetAutoIncrement = 'ALTER TABLE client AUTO_INCREMENT = 1';
            connectDB_1.default.query(resetAutoIncrement, (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve();
            });
        });
    });
});
exports.deleteAllClientService = deleteAllClientService;
const getClientByIdService = (clientId) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = 'SELECT * FROM client WHERE id = ?';
    return new Promise((resolve, reject) => {
        connectDB_1.default.query(sql, [clientId], (error, result) => {
            if (error) {
                console.error('Error Fetching client');
                return reject(error);
            }
            if (result.length === 0) {
                return reject(new Error('Client Not Found'));
            }
            resolve(result[0]);
        });
    });
});
exports.getClientByIdService = getClientByIdService;
const deleteClientByIdService = (clientId) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = 'DELETE FROM client WHERE id = ?';
    return new Promise((resolve, reject) => {
        connectDB_1.default.query(sql, [clientId], (error, result) => {
            if (error) {
                console.error('Error Deleteing client data by id');
                return reject(error);
            }
            resolve();
        });
    });
});
exports.deleteClientByIdService = deleteClientByIdService;
const putClientByIdService = (clientId, clientData) => __awaiter(void 0, void 0, void 0, function* () {
    const fetchsql = 'SELECT client_name, client_image FROM client WHERE id =?';
    return new Promise((resolve, reject) => {
        connectDB_1.default.query(fetchsql, [clientId], (error, result) => {
            if (error) {
                return reject(error);
            }
            if (result.length === 0) {
                return reject(new Error('Client Not Found'));
            }
            const existingValue = result[0];
            const updatename = clientData.client_name !== undefined ? clientData.client_name : existingValue.client_name;
            const updateimage = clientData.client_image !== undefined ? clientData.client_image : existingValue.client_image;
            const updatesql = 'UPDATE client SET client_name = ?, client_image = ? WHERE id = ?';
            connectDB_1.default.query(updatesql, [updatename, updateimage, clientId], (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve({
                    id: clientId,
                    client_name: updatename,
                    client_image: updateimage
                });
            });
        });
    });
});
exports.putClientByIdService = putClientByIdService;
//# sourceMappingURL=client.service.js.map