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
exports.updateClientController = exports.deleteClientByIdController = exports.getClientByIdController = exports.deleteallClientController = exports.postClientController = exports.getallClientController = void 0;
const ClientService = __importStar(require("../services/client.service"));
const fileHandling_1 = require("../utils/fileHandling");
const logger_1 = require("../utils/logger");
const client_validation_1 = require("../validations/client.validation");
const getallClientController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 15;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    try {
        const client = yield ClientService.getallClientService();
        if (client.length === 0) {
            res.status(404).send({
                message: 'Client Not Found'
            });
            return;
        }
        const paginationResult = client.slice(start, end);
        // const formattedData = paginationResult.map((data) => ({
        //   id: data.id,
        //   data: {
        //     client_name: data.client_name,
        //     client_image: data.client_image
        //   }
        // }))
        const validationData = paginationResult.map((data) => {
            const { error } = (0, client_validation_1.ClientValidation)(data);
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
                    client_name: data.client_name,
                    client_image: data.client_image
                }
            };
        });
        logger_1.logger.info('Status 200: Get All Client Data');
        res.status(200).send({
            page,
            pageSize,
            totalData: client.length,
            totalPages: Math.ceil(client.length / pageSize),
            client: validationData,
            message: 'Success'
        });
    }
    catch (error) {
        logger_1.logger.error('Status 500 : Error Fetching client data');
        res.status(500).send({
            message: 'Error Fetching Client Data',
            error: error
        });
    }
});
exports.getallClientController = getallClientController;
const postClientController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let client_image_URL = '';
    const isFilesObject = (files) => {
        return typeof files === 'object' && !Array.isArray(files);
    };
    try {
        if (req.files && isFilesObject(req.files)) {
            const client_image_file = (_a = req.files['client_image']) === null || _a === void 0 ? void 0 : _a[0];
            if (client_image_file) {
                client_image_URL = yield (0, fileHandling_1.uploadFile)(client_image_file);
            }
        }
        const { client_name } = req.body;
        const payload = { id: 0, client_name, client_image: client_image_URL };
        const { error } = (0, client_validation_1.ClientValidation)(payload);
        if (error) {
            logger_1.logger.error(`Validation error: ${error.message}`);
            res.status(400).send({
                message: 'Validation Failed',
                error: error.message
            });
            return;
        }
        const newClient = yield ClientService.postClientService(client_name, client_image_URL);
        logger_1.logger.info('Status 200 : Insert client data');
        res.status(200).send({
            message: 'Success',
            clientId: newClient.id
        });
    }
    catch (error) {
        logger_1.logger.error('Status 500 : Error Inserting client data');
        res.status(500).send({
            message: 'Error Inserting Client',
            error: error
        });
    }
});
exports.postClientController = postClientController;
const deleteallClientController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield ClientService.deleteAllClientService();
        logger_1.logger.info('Status 200: Deleting all client data');
        res.status(200).send({
            message: 'All client deleted'
        });
    }
    catch (error) {
        logger_1.logger.error('Error Delete all client data');
        res.status(500).send({
            message: 'Error Deleting all client data',
            error: error
        });
    }
});
exports.deleteallClientController = deleteallClientController;
const getClientByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const clientId = parseInt(req.params.id);
    if (isNaN(clientId)) {
        res.status(400).send({
            message: 'Invalid client ID'
        });
    }
    try {
        const client = yield ClientService.getClientByIdService(clientId);
        logger_1.logger.info('Status 200: Successfully Fetching Client data');
        const { error } = (0, client_validation_1.ClientValidation)(client);
        if (error) {
            logger_1.logger.error(`Validation error for category ID ${clientId}: ${error.message}`);
            res.status(400).send({
                message: 'Validation Failed',
                error: error.message
            });
            return;
        }
        res.status(200).send({
            id: client.id,
            data: {
                client_name: client.client_name,
                client_image: client.client_image
            }
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(404).send({
                message: 'Client Not Found'
            });
        }
        else {
            logger_1.logger.error('Error Fetching client data');
            res.status(500).send({
                message: 'Error Fething client data',
                error: error
            });
        }
    }
});
exports.getClientByIdController = getClientByIdController;
const deleteClientByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const clientId = parseInt(req.params.id);
    if (isNaN(clientId)) {
        res.status(400).send({
            message: 'Invalid Client ID'
        });
    }
    try {
        yield ClientService.deleteClientByIdService(clientId);
        logger_1.logger.info('Deleted client by ID');
        res.status(200).send({
            message: 'Deleted'
        });
    }
    catch (error) {
        logger_1.logger.error('Error Delete all client data');
        res.status(500).send({
            message: 'Error Deleting all client data',
            error: error
        });
    }
});
exports.deleteClientByIdController = deleteClientByIdController;
const updateClientController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let client_image_URL = '';
    const isFilesObject = (files) => {
        return typeof files === 'object' && !Array.isArray(files);
    };
    const clientId = parseInt(req.params.id);
    const { client_name } = req.body;
    try {
        if (req.files && isFilesObject(req.files)) {
            const client_image_file = (_a = req.files['client_image']) === null || _a === void 0 ? void 0 : _a[0];
            if (client_image_file) {
                client_image_URL = yield (0, fileHandling_1.uploadFile)(client_image_file);
            }
        }
        const clientData = {
            client_name,
            client_image: client_image_URL || undefined
        };
        const payload = {
            id: clientId,
            client_name,
            client_image: client_image_URL !== null ? client_image_URL : ''
        };
        const { error } = (0, client_validation_1.ClientValidation)(payload);
        if (error) {
            logger_1.logger.error(`Validation error for client update: ${error.message}`);
            res.status(400).send({
                message: 'Validation Failed',
                error: error.message
            });
            return;
        }
        const updatedClient = yield ClientService.putClientByIdService(Number(clientId), clientData);
        res.status(200).send({
            message: 'Client Updated Successfully',
            client: updatedClient
        });
    }
    catch (error) {
        res.status(500).send({
            message: 'Error Updating Client',
            error: error
        });
    }
});
exports.updateClientController = updateClientController;
//# sourceMappingURL=client.controller.js.map