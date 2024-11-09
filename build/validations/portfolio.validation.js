"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortofolioValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const PortofolioValidation = (payload) => {
    const schema = joi_1.default.object({
        id: joi_1.default.number().required(),
        template: joi_1.default.string().required(), //error if null
        location: joi_1.default.string().required(),
        area: joi_1.default.string().required(),
        year: joi_1.default.number().required(),
        slug: joi_1.default.string().required(),
        cover: joi_1.default.string().required(),
        highlight: joi_1.default.number().required(),
        copy_1: joi_1.default.string().allow('').optional(),
        copy_2: joi_1.default.string().allow('').optional(),
        copy_3: joi_1.default.string().allow('').optional(),
        copy_4: joi_1.default.string().allow('').optional(),
        copy_5: joi_1.default.string().allow('').optional(),
        copy_6: joi_1.default.string().allow('').optional(),
        image_1: joi_1.default.string().uri().allow('').optional(),
        image_2: joi_1.default.string().uri().allow('').optional(),
        image_3: joi_1.default.string().uri().allow('').optional(),
        image_4: joi_1.default.string().uri().allow('').optional(),
        image_5: joi_1.default.string().uri().allow('').optional(),
        image_6: joi_1.default.string().uri().allow('').optional(),
        image_7: joi_1.default.string().uri().allow('').optional(),
        image_8: joi_1.default.string().uri().allow('').optional(),
        image_9: joi_1.default.string().uri().allow('').optional(),
        image_10: joi_1.default.string().uri().allow('').optional(),
        image_11: joi_1.default.string().uri().allow('').optional(),
        image_12: joi_1.default.string().uri().allow('').optional(),
        category_1_id: joi_1.default.number().allow(null).optional(),
        category_2_id: joi_1.default.number().allow(null).optional(),
        category_3_id: joi_1.default.number().allow(null).optional(),
        client_id: joi_1.default.number().required(),
        client_name: joi_1.default.string(),
        category_name_1: joi_1.default.string().allow(null).optional(),
        category_name_2: joi_1.default.string().allow(null).optional(),
        category_name_3: joi_1.default.string().allow(null).optional()
    });
    return schema.validate(payload);
};
exports.PortofolioValidation = PortofolioValidation;
//# sourceMappingURL=portfolio.validation.js.map