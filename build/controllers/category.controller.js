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
Object.defineProperty(exports, "__esModule", { value: true });
exports.putCategoryByIdControoler = exports.deletCategoryByIdController = exports.getCategoryByIdController = exports.deleteallCategoryController = exports.postCategoryController = exports.getallCategoryController = void 0;
const CategoryService = __importStar(require("../services/category.service"));
const logger_1 = require("../utils/logger");
const category_validation_1 = require("../validations/category.validation");
const getallCategoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 15;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    try {
        const category = yield CategoryService.getallCategoryService();
        if (category.length === 0) {
            res.status(404).send({
                message: 'Category Not Found'
            });
            return;
        }
        const paginationResult = category.slice(start, end);
        // const formattedData = paginationResult.map((data) => ({
        //   id: data.id,
        //   data: {
        //     category_name: data.category_name
        //   }
        // }))
        const validatedData = paginationResult.map((data) => {
            const { error } = (0, category_validation_1.CategoryValidation)(data);
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
                    category_name: data.category_name
                }
            };
        });
        logger_1.logger.info(`Status 200: Get All Category success`);
        res.status(200).send({
            page,
            pageSize,
            totalData: category.length,
            totalPages: Math.ceil(category.length / pageSize),
            category: validatedData,
            message: 'Success'
        });
    }
    catch (error) {
        logger_1.logger.error(`Status 500: Error Fetching Category Data - ${error}`);
        res.status(500).send({
            message: 'Error Fetching Category Data',
            error: error
        });
    }
});
exports.getallCategoryController = getallCategoryController;
const postCategoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category_name } = req.body;
    const payload = { id: 0, category_name };
    const { error } = (0, category_validation_1.CategoryValidation)(payload);
    if (error) {
        logger_1.logger.error(`Validation error: ${error.message}`);
        res.status(400).send({
            message: 'Validation Failed',
            error: error.message
        });
        return;
    }
    try {
        const newCategory = yield CategoryService.postCategoryService(category_name);
        logger_1.logger.info(`Category created`);
        res.status(200).send({
            message: 'Category Created Successfully',
            categoryId: newCategory.id
        });
    }
    catch (error) {
        res.status(500).send({
            message: 'Error Inserting Category',
            error: error
        });
    }
});
exports.postCategoryController = postCategoryController;
const deleteallCategoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield CategoryService.deleteAllCategoryService();
        logger_1.logger.info('All categories deleted successfully');
        res.status(200).send({
            message: 'All Categories Deleted Successfully'
        });
    }
    catch (error) {
        res.status(500).send({
            message: 'Error Deleteing All Category',
            error: error
        });
    }
});
exports.deleteallCategoryController = deleteallCategoryController;
const getCategoryByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryId = parseInt(req.params.id);
    if (isNaN(categoryId)) {
        res.status(400).send({ message: 'Invalid Category ID' });
        return;
    }
    try {
        const category = yield CategoryService.getCategoryByIdService(categoryId);
        logger_1.logger.info(`Fetched category with ID: ${categoryId}`);
        const { error } = (0, category_validation_1.CategoryValidation)(category);
        if (error) {
            logger_1.logger.error(`Validation error for category ID ${categoryId}: ${error.message}`);
            res.status(400).send({
                message: 'Validation Failed',
                error: error.message
            });
            return;
        }
        res.status(200).send({
            id: category.id,
            data: {
                category_name: category.category_name
            },
            message: 'Success'
        });
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.message === 'Category Not Found') {
                res.status(404).send({ message: 'Category Not Found' });
            }
            else {
                logger_1.logger.error(`Error fetching category: ${error.message}`);
                res.status(500).send({
                    message: 'Error Fetching Category',
                    error: error.message || error
                });
            }
        }
    }
});
exports.getCategoryByIdController = getCategoryByIdController;
const deletCategoryByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryId = parseInt(req.params.id);
    if (isNaN(categoryId)) {
        res.status(400).send({ message: 'Invalid Category ID' });
        return;
    }
    try {
        yield CategoryService.deleteCategoryByIdService(categoryId);
        logger_1.logger.info(`Deleted category with ID: ${categoryId}`);
        res.status(200).send({
            message: 'Deleted'
        });
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.message === 'Category Not Found') {
                res.status(404).send({ message: 'Category Not Found' });
            }
            else {
                logger_1.logger.error(`Error deleting category: ${error.message}`);
                res.status(500).send({
                    message: 'Error Deleting Category',
                    error: error.message
                });
            }
        }
        else {
            logger_1.logger.error(`Unexpected error: ${String(error)}`);
            res.status(500).send({
                message: 'Unexpected Error Deleting Category',
                error: String(error)
            });
        }
    }
});
exports.deletCategoryByIdController = deletCategoryByIdController;
const putCategoryByIdControoler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryId = parseInt(req.params.id);
    const categoryData = req.body;
    categoryData['id'] = categoryId;
    if (isNaN(categoryId)) {
        res.status(400).send({ message: 'Invalid Category ID' });
        return;
    }
    const { error } = (0, category_validation_1.CategoryValidation)(categoryData);
    if (error) {
        logger_1.logger.error(`Validation error for category update: ${error.message}`);
        res.status(400).send({
            message: 'Validation Failed',
            error: error.message
        });
        return;
    }
    try {
        const updatedCategory = yield CategoryService.updateCategoryByIdService(categoryId, categoryData);
        logger_1.logger.info(`Updated category with ID: ${categoryId}`);
        res.status(200).send({
            message: 'Update Successful',
            category: updatedCategory
        });
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.message === 'Category Not Found') {
                res.status(404).send({ message: 'Category Not Found' });
            }
            else {
                logger_1.logger.error(`Error updating category: ${error.message}`);
                res.status(500).send({
                    message: 'Error Updating Category',
                    error: error.message
                });
            }
        }
        else {
            logger_1.logger.error(`Unexpected error: ${String(error)}`);
            res.status(500).send({
                message: 'Unexpected Error Updating Category',
                error: String(error)
            });
        }
    }
});
exports.putCategoryByIdControoler = putCategoryByIdControoler;
//# sourceMappingURL=category.controller.js.map