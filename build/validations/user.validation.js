"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const UserValidation = (payload) => {
    const schema = joi_1.default.object({
        id: joi_1.default.number().required(),
        fullname: joi_1.default.string().allow(null, '').optional(),
        email: joi_1.default.string().allow(null, '').optional(),
        username: joi_1.default.string().allow(null, '').optional(),
        password: joi_1.default.string().allow(null, '').optional(),
        created: joi_1.default.string().allow(null, '').optional(),
        updated: joi_1.default.string().allow(null, '').optional(),
        last_login: joi_1.default.string().allow(null, '').optional()
    });
    return schema.validate(payload);
};
exports.UserValidation = UserValidation;
//# sourceMappingURL=user.validation.js.map