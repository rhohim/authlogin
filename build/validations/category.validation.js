"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const CategoryValidation = (payload) => {
    const schema = joi_1.default.object({
        id: joi_1.default.number().required(),
        category_name: joi_1.default.string().required()
    });
    return schema.validate(payload);
};
exports.CategoryValidation = CategoryValidation;
//# sourceMappingURL=category.validation.js.map