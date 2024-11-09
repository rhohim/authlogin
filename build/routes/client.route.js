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
const multer_1 = __importDefault(require("multer"));
const ClientController = __importStar(require("../controllers/client.controller"));
const bearerToken_middleware_1 = require("../middleware/bearerToken.middleware");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
router
    .route('/')
    .get(bearerToken_middleware_1.authenticateAndAuthorize, ClientController.getallClientController)
    .post(bearerToken_middleware_1.authenticateAndAuthorize, upload.fields([{ name: 'client_image', maxCount: 1 }]), ClientController.postClientController)
    .delete(bearerToken_middleware_1.authenticateAndAuthorize, ClientController.deleteallClientController);
router
    .route('/:id')
    .get(bearerToken_middleware_1.authenticateAndAuthorize, ClientController.getClientByIdController)
    .delete(bearerToken_middleware_1.authenticateAndAuthorize, ClientController.deleteClientByIdController)
    .put(bearerToken_middleware_1.authenticateAndAuthorize, upload.fields([{ name: 'client_image', maxCount: 1 }]), ClientController.updateClientController);
exports.default = router;
//# sourceMappingURL=client.route.js.map