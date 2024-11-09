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
exports.deleteAllPortfoliosController = exports.deletePortfolioByIdController = exports.getPortfolioByIdController = exports.getAllPortfolioController = exports.putPortfolioByIdController = exports.postPortfolioController = void 0;
const PortfolioService = __importStar(require("../services/portfolio.service"));
const fileHandling_1 = require("../utils/fileHandling");
const logger_1 = require("../utils/logger");
const portfolio_validation_1 = require("../validations/portfolio.validation");
const postPortfolioController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const image_URLs = Array(12).fill('');
    let coverImageUrl = '';
    const isFilesObject = (files) => {
        return typeof files === 'object' && !Array.isArray(files);
    };
    if (req.files && isFilesObject(req.files)) {
        const image_files = req.files['image'];
        // console.log(image_files)
        // if (image_files && image_files.length > 0) {
        //   for (let i = 0; i < image_files.length; i++) {
        //     const image_URL = await uploadFile(image_files[i])
        //     if (i < 12) {
        //       image_URLs[i] = image_URL
        //     }
        //   }
        // }
        if (image_files && image_files.length > 0) {
            const uploadPromises = image_files.slice(0, 12).map((file) => (0, fileHandling_1.uploadFile)(file));
            const uploadedURLs = yield Promise.all(uploadPromises);
            for (let i = 0; i < uploadedURLs.length; i++) {
                image_URLs[i] = uploadedURLs[i];
            }
        }
        const cover_file = req.files['cover'];
        if (cover_file && cover_file.length > 0) {
            coverImageUrl = yield (0, fileHandling_1.uploadFile)(cover_file[0]);
        }
    }
    const { template, location, area, year, highlight, copy_1, copy_2, copy_3, copy_4, copy_5, copy_6, category_1_id, category_2_id, category_3_id, client_id } = req.body;
    const copies = [copy_1, copy_2, copy_3, copy_4, copy_5, copy_6];
    const categories = [category_1_id, category_2_id, category_3_id].map((cat) => (cat === '' ? null : cat));
    try {
        // console.log(template, location, area, year, coverImageUrl, highlight, copies, image_URLs, categories, client_id)
        const newPortfolio = yield PortfolioService.postPortfolioService(template, location, area, year, coverImageUrl, highlight, copies, image_URLs, categories, client_id);
        logger_1.logger.info('Status 200: Inserted portfolio data');
        res.status(200).send({
            message: 'Success',
            portfolioId: newPortfolio.id
        });
    }
    catch (error) {
        logger_1.logger.error('Status 500: Error inserting portfolio data', { error });
        res.status(500).send({
            message: 'Error inserting portfolio',
            error: error
        });
    }
});
exports.postPortfolioController = postPortfolioController;
const putPortfolioByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const portfolioId = parseInt(req.params.id);
    let coverURL = '';
    const image_URLs = Array(12).fill('');
    const isFilesObject = (files) => {
        return typeof files === 'object' && !Array.isArray(files);
    };
    if (req.files && isFilesObject(req.files)) {
        const coverFile = req.files['cover'];
        if (coverFile && coverFile.length > 0) {
            coverURL = yield (0, fileHandling_1.uploadFile)(coverFile[0]);
        }
        for (let i = 1; i <= 12; i++) {
            const imageFile = req.files[`image_${i}`];
            if (imageFile && imageFile.length > 0) {
                image_URLs[i - 1] = yield (0, fileHandling_1.uploadFile)(imageFile[0]);
            }
        }
    }
    const { template, location, area, year, highlight, copy_1, copy_2, copy_3, copy_4, copy_5, copy_6, category_1_id, category_2_id, category_3_id, client_id } = req.body;
    const updatedData = {
        template,
        location,
        area,
        year,
        cover: coverURL,
        highlight,
        copy_1,
        copy_2,
        copy_3,
        copy_4,
        copy_5,
        copy_6,
        image_1: image_URLs[0] || undefined,
        image_2: image_URLs[1] || undefined,
        image_3: image_URLs[2] || undefined,
        image_4: image_URLs[3] || undefined,
        image_5: image_URLs[4] || undefined,
        image_6: image_URLs[5] || undefined,
        image_7: image_URLs[6] || undefined,
        image_8: image_URLs[7] || undefined,
        image_9: image_URLs[8] || undefined,
        image_10: image_URLs[9] || undefined,
        image_11: image_URLs[10] || undefined,
        image_12: image_URLs[11] || undefined,
        category_1_id: category_1_id ? parseInt(category_1_id) : undefined,
        category_2_id: category_2_id ? parseInt(category_2_id) : undefined,
        category_3_id: category_3_id ? parseInt(category_3_id) : undefined,
        client_id: client_id ? parseInt(client_id) : undefined
    };
    try {
        const updatedPortfolio = yield PortfolioService.putPortfolioByIdService(portfolioId, updatedData);
        logger_1.logger.info(`Portfolio with ID ${portfolioId} updated successfully`);
        res.status(200).json({
            message: 'Portfolio updated successfully',
            portfolio: updatedPortfolio
        });
    }
    catch (error) {
        logger_1.logger.error(`Error updating portfolio with ID ${portfolioId}`, { error });
        res.status(500).json({
            message: 'Error updating portfolio',
            error: error
        });
    }
});
exports.putPortfolioByIdController = putPortfolioByIdController;
const getAllPortfolioController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 15;
    const start = (page - 1) * pageSize;
    try {
        const portfolios = yield PortfolioService.getallPortfolioService();
        if (portfolios.length === 0) {
            res.status(404).send({ message: 'No Portfolios Found' });
            return;
        }
        const paginationResult = portfolios.slice(start, start + pageSize);
        const validatedData = paginationResult.map((data) => {
            const { error } = (0, portfolio_validation_1.PortofolioValidation)(data);
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
                    template: data.template,
                    location: data.location,
                    area: data.area,
                    year: data.year,
                    cover: data.cover,
                    slug: data.slug,
                    highlight: data.highlight,
                    copy_1: data.copy_1,
                    copy_2: data.copy_2,
                    copy_3: data.copy_3,
                    copy_4: data.copy_4,
                    copy_5: data.copy_5,
                    copy_6: data.copy_6,
                    image_1: data.image_1,
                    image_2: data.image_2,
                    image_3: data.image_3,
                    image_4: data.image_4,
                    image_5: data.image_5,
                    image_6: data.image_6,
                    image_7: data.image_7,
                    image_8: data.image_8,
                    image_9: data.image_9,
                    image_10: data.image_10,
                    image_11: data.image_11,
                    image_12: data.image_12,
                    category: [data.category_name_1, data.category_name_2, data.category_name_3],
                    client_id: [{ id: data.client_id, name: data.client_name }]
                }
            };
        });
        // .filter((item): item is NonNullable<typeof item> => item !== null)
        logger_1.logger.info(`Status 200: Get All Portfolio success`);
        res.status(200).send({
            page,
            pageSize,
            totalData: portfolios.length,
            totalPages: Math.ceil(portfolios.length / pageSize),
            portfolio: validatedData,
            message: 'Success'
        });
    }
    catch (error) {
        logger_1.logger.error(`Status 500: Error Fetching Portfolio Data - ${error}`);
        res.status(500).send({
            message: 'Error Fetching Portfolio Data',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
exports.getAllPortfolioController = getAllPortfolioController;
const getPortfolioByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const portfolioId = req.params.id;
    try {
        const portfolio = yield PortfolioService.getPortfolioByIdService(portfolioId);
        if (!portfolio) {
            res.status(404).send({ message: 'Portfolio Not Found' });
            return;
        }
        const { error } = (0, portfolio_validation_1.PortofolioValidation)(portfolio);
        if (error) {
            logger_1.logger.error(`Validation error: ${error.message}`);
            res.status(400).send({
                message: 'Validation Failed',
                error: error.message
            });
            return;
        }
        logger_1.logger.info(`Status 200: Get Portfolio By ID success`);
        res.status(200).send({
            id: portfolio.id,
            data: {
                template: portfolio.template,
                location: portfolio.location,
                area: portfolio.area,
                year: portfolio.year,
                cover: portfolio.cover,
                slug: portfolio.slug,
                highlight: portfolio.highlight,
                copy_1: portfolio.copy_1,
                copy_2: portfolio.copy_2,
                copy_3: portfolio.copy_3,
                copy_4: portfolio.copy_4,
                copy_5: portfolio.copy_5,
                copy_6: portfolio.copy_6,
                image_1: portfolio.image_1,
                image_2: portfolio.image_2,
                image_3: portfolio.image_3,
                image_4: portfolio.image_4,
                image_5: portfolio.image_5,
                image_6: portfolio.image_6,
                image_7: portfolio.image_7,
                image_8: portfolio.image_8,
                image_9: portfolio.image_9,
                image_10: portfolio.image_10,
                image_11: portfolio.image_11,
                image_12: portfolio.image_12,
                category: [portfolio.category_name_1, portfolio.category_name_2, portfolio.category_name_3],
                client_id: { id: portfolio.client_id, name: portfolio.client_name }
            }
        });
    }
    catch (error) {
        logger_1.logger.error(`Status 500: Error Fetching Portfolio Data - ${error}`);
        res.status(500).send({
            message: 'Error Fetching Portfolio Data',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
exports.getPortfolioByIdController = getPortfolioByIdController;
const deletePortfolioByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const portfolioId = parseInt(req.params.id);
    try {
        yield PortfolioService.deletePortfolioByIdService(portfolioId);
        logger_1.logger.info(`Status 200: Portfolio with ID ${portfolioId} deleted successfully`);
        res.status(200).send({ message: 'Portfolio Deleted Successfully' });
    }
    catch (error) {
        if (error === 'Portfolio Not Found') {
            logger_1.logger.warn(`Status 404: ${error}`);
            res.status(404).send({ message: error });
        }
        else {
            logger_1.logger.error(`Status 500: Error Deleting Portfolio - ${error}`);
            res.status(500).send({
                message: 'Error Deleting Portfolio',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
});
exports.deletePortfolioByIdController = deletePortfolioByIdController;
const deleteAllPortfoliosController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield PortfolioService.deleteAllPortfoliosService();
        logger_1.logger.info(`Status 200: All portfolios deleted successfully`);
        res.status(200).send({ message: 'All Portfolios Deleted Successfully' });
    }
    catch (error) {
        logger_1.logger.error(`Status 500: Error Deleting All Portfolios - ${error}`);
        res.status(500).send({
            message: 'Error Deleting All Portfolios',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
exports.deleteAllPortfoliosController = deleteAllPortfoliosController;
//# sourceMappingURL=portfolio.controller.js.map