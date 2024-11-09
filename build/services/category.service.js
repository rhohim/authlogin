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
exports.updateCategoryByIdService = exports.deleteCategoryByIdService = exports.getCategoryByIdService = exports.deleteAllCategoryService = exports.postCategoryService = exports.getallCategoryService = void 0;
const connectDB_1 = __importDefault(require("../utils/connectDB"));
const getallCategoryService = () => __awaiter(void 0, void 0, void 0, function* () {
    const sql = 'SELECT * FROM category';
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
exports.getallCategoryService = getallCategoryService;
const postCategoryService = (category_name) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = 'INSERT INTO category (category_name) VALUES (?)';
    const values = [category_name];
    return new Promise((resolve, reject) => {
        connectDB_1.default.query(sql, values, (error, result) => {
            if (error) {
                reject(error);
            }
            else {
                resolve({
                    id: result.insertId,
                    category_name
                });
            }
        });
    });
});
exports.postCategoryService = postCategoryService;
const deleteAllCategoryService = () => __awaiter(void 0, void 0, void 0, function* () {
    const sql = 'DELETE FROM category';
    return new Promise((resolve, reject) => {
        connectDB_1.default.query(sql, (error, result) => {
            if (error) {
                console.error('Error Deleting Categories: ', error);
                return reject(error);
            }
            const resetAutoIncrement = 'ALTER TABLE category AUTO_INCREMENT = 1';
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
exports.deleteAllCategoryService = deleteAllCategoryService;
const getCategoryByIdService = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = 'SELECT * FROM category WHERE id = ?';
    return new Promise((resolve, reject) => {
        connectDB_1.default.query(sql, [categoryId], (error, result) => {
            if (error) {
                console.error('Error Fetching Category: ', error);
                return reject(error);
            }
            if (result.length === 0) {
                return reject(new Error('Category Not Found'));
            }
            resolve(result[0]);
        });
    });
});
exports.getCategoryByIdService = getCategoryByIdService;
const deleteCategoryByIdService = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = 'DELETE FROM category WHERE id = ?';
    return new Promise((resolve, reject) => {
        connectDB_1.default.query(sql, [categoryId], (error, result) => {
            if (error) {
                console.error('Error Deleting Category: ', error);
                return reject(error);
            }
            if (result.affectedRows === 0) {
                return reject(new Error('Category Not Found'));
            }
            resolve();
        });
    });
});
exports.deleteCategoryByIdService = deleteCategoryByIdService;
const updateCategoryByIdService = (categoryId, categoryData) => __awaiter(void 0, void 0, void 0, function* () {
    const fetchSql = 'SELECT category_name FROM category WHERE id = ?';
    return new Promise((resolve, reject) => {
        connectDB_1.default.query(fetchSql, [categoryId], (fetchError, fetchResult) => {
            if (fetchError) {
                console.error('Error Fetching Category Details: ', fetchError);
                return reject(fetchError);
            }
            if (fetchResult.length === 0) {
                return reject(new Error('Category Not Found'));
            }
            const existingValues = fetchResult[0];
            const updateName = categoryData.category_name !== undefined ? categoryData.category_name : existingValues.category_name;
            const updateSql = 'UPDATE category SET category_name = ? WHERE id = ?';
            const values = [updateName, categoryId];
            connectDB_1.default.query(updateSql, values, (error, result) => {
                if (error) {
                    console.error('Error Updating Category: ', error);
                    return reject(error);
                }
                resolve({
                    id: categoryId,
                    category_name: updateName
                });
            });
        });
    });
});
exports.updateCategoryByIdService = updateCategoryByIdService;
//# sourceMappingURL=category.service.js.map