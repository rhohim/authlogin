"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const ClientValidation = (payload) => {
    const schema = joi_1.default.object({
        id: joi_1.default.number().required(),
        client_name: joi_1.default.string().required(),
        client_image: joi_1.default.string().allow(null, '').optional()
    });
    return schema.validate(payload);
};
exports.ClientValidation = ClientValidation;
//# sourceMappingURL=client.validation.js.map