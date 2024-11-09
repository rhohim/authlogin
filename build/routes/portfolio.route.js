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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PortfolioController = __importStar(require("../controllers/portfolio.controller"));
const bearerToken_middleware_1 = require("../middleware/bearerToken.middleware");
const multer_1 = __importDefault(require("multer"));
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
router
    .route('/')
    .post(bearerToken_middleware_1.authenticateAndAuthorize, upload.fields([
    { name: 'image', maxCount: 12 },
    { name: 'cover', maxCount: 1 }
]), PortfolioController.postPortfolioController)
    .get(bearerToken_middleware_1.authenticateAndAuthorize, PortfolioController.getAllPortfolioController)
    .delete(bearerToken_middleware_1.authenticateAndAuthorize, PortfolioController.deleteAllPortfoliosController);
router
    .route('/:id')
    .put(bearerToken_middleware_1.authenticateAndAuthorize, upload.fields([
    { name: 'image_1', maxCount: 1 },
    { name: 'image_2', maxCount: 1 },
    { name: 'image_3', maxCount: 1 },
    { name: 'image_4', maxCount: 1 },
    { name: 'image_5', maxCount: 1 },
    { name: 'image_6', maxCount: 1 },
    { name: 'image_7', maxCount: 1 },
    { name: 'image_8', maxCount: 1 },
    { name: 'image_9', maxCount: 1 },
    { name: 'image_10', maxCount: 1 },
    { name: 'image_11', maxCount: 1 },
    { name: 'image_12', maxCount: 1 },
    { name: 'cover', maxCount: 1 }
]), PortfolioController.putPortfolioByIdController)
    .get(bearerToken_middleware_1.authenticateAndAuthorize, PortfolioController.getPortfolioByIdController)
    .delete(bearerToken_middleware_1.authenticateAndAuthorize, PortfolioController.deletePortfolioByIdController);
exports.default = router;
//# sourceMappingURL=portfolio.route.js.map