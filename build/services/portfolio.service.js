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
exports.deleteAllPortfoliosService = exports.deletePortfolioByIdService = exports.getPortfolioByIdService = exports.getallPortfolioService = exports.putPortfolioByIdService = exports.postPortfolioService = void 0;
const connectDB_1 = __importDefault(require("../utils/connectDB"));
const postPortfolioService = (template, location, area, year, cover, highlight, copies, image_URLs, categories, client_id) => __awaiter(void 0, void 0, void 0, function* () {
    const clientsql = `SELECT client_name FROM client WHERE id = ?`;
    const clientResult = yield new Promise((resolve, reject) => {
        connectDB_1.default.query(clientsql, [client_id], (error, result) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(result);
            }
        });
    });
    if (!clientResult || clientResult.length === 0) {
        throw new Error('Client not found');
    }
    const slug = clientResult[0].client_name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
    const sql = `
    INSERT INTO portfolio 
      (template , location, area, year, cover, slug, highlight, 
      copy_1, copy_2, copy_3, copy_4, copy_5, copy_6,
      image_1, image_2, image_3, image_4, image_5, image_6,
      image_7, image_8, image_9, image_10, image_11, image_12,
      category_1_id, category_2_id, category_3_id,
      client_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, 
            ?, ?, ?, ?, ?, ?, 
            ?, ?, ?, ?, ?, ?, 
            ?, ?, ?, ?, ?, ?, 
            ?, ?, ?,
            ?)`;
    const values = [
        template,
        location,
        area,
        year,
        cover,
        slug,
        highlight,
        ...copies,
        ...image_URLs,
        ...categories,
        client_id
    ];
    // console.log(values)
    return new Promise((resolve, reject) => {
        connectDB_1.default.query(sql, values, (error, result) => {
            if (error) {
                reject(error);
            }
            else {
                resolve({
                    id: result.insertId,
                    template,
                    location,
                    area,
                    year,
                    cover,
                    slug,
                    highlight,
                    copy_1: copies[0] || '',
                    copy_2: copies[1] || '',
                    copy_3: copies[2] || '',
                    copy_4: copies[3] || '',
                    copy_5: copies[4] || '',
                    copy_6: copies[5] || '',
                    image_1: image_URLs[0] || '',
                    category_1_id: categories[0] || null,
                    category_2_id: categories[1] || null,
                    category_3_id: categories[2] || null,
                    client_id
                });
            }
        });
    });
});
exports.postPortfolioService = postPortfolioService;
const putPortfolioByIdService = (portfolioId, portfolioData) => __awaiter(void 0, void 0, void 0, function* () {
    const fetchsql = 'SELECT template, location, area, year, cover, highlight, copy_1, copy_2, copy_3, copy_4, copy_5, copy_6, image_1, image_2, image_3, image_4, image_5, image_6, image_7, image_8, image_9, image_10, image_11, image_12, category_1_id, category_2_id,category_3_id, client_id FROM portfolio WHERE id = ?';
    return new Promise((resolve, reject) => {
        connectDB_1.default.query(fetchsql, [portfolioId], (error, result) => {
            if (error) {
                return reject(error);
            }
            if (result.length === 0) {
                return reject(new Error('Portfolio Not Found'));
            }
            const getUpdatedValue = (newValue, existingValue) => {
                return newValue !== undefined && newValue !== '' ? newValue : existingValue;
            };
            const existingValue = result[0];
            const updatedPortfolio = {
                template: getUpdatedValue(portfolioData.template, existingValue.template),
                location: getUpdatedValue(portfolioData.location, existingValue.location),
                area: getUpdatedValue(portfolioData.area, existingValue.area),
                year: getUpdatedValue(portfolioData.year, existingValue.year),
                cover: getUpdatedValue(portfolioData.cover, existingValue.cover),
                highlight: getUpdatedValue(portfolioData.highlight, existingValue.highlight),
                copy_1: getUpdatedValue(portfolioData.copy_1, existingValue.copy_1),
                copy_2: getUpdatedValue(portfolioData.copy_2, existingValue.copy_2),
                copy_3: getUpdatedValue(portfolioData.copy_3, existingValue.copy_3),
                copy_4: getUpdatedValue(portfolioData.copy_4, existingValue.copy_4),
                copy_5: getUpdatedValue(portfolioData.copy_5, existingValue.copy_5),
                copy_6: getUpdatedValue(portfolioData.copy_6, existingValue.copy_6),
                image_1: getUpdatedValue(portfolioData.image_1, existingValue.image_1),
                image_2: getUpdatedValue(portfolioData.image_2, existingValue.image_2),
                image_3: getUpdatedValue(portfolioData.image_3, existingValue.image_3),
                image_4: getUpdatedValue(portfolioData.image_4, existingValue.image_4),
                image_5: getUpdatedValue(portfolioData.image_5, existingValue.image_5),
                image_6: getUpdatedValue(portfolioData.image_6, existingValue.image_6),
                image_7: getUpdatedValue(portfolioData.image_7, existingValue.image_7),
                image_8: getUpdatedValue(portfolioData.image_8, existingValue.image_8),
                image_9: getUpdatedValue(portfolioData.image_9, existingValue.image_9),
                image_10: getUpdatedValue(portfolioData.image_10, existingValue.image_10),
                image_11: getUpdatedValue(portfolioData.image_11, existingValue.image_11),
                image_12: getUpdatedValue(portfolioData.image_12, existingValue.image_12),
                category_1_id: getUpdatedValue(portfolioData.category_1_id, existingValue.category_1_id),
                category_2_id: getUpdatedValue(portfolioData.category_2_id, existingValue.category_2_id),
                category_3_id: getUpdatedValue(portfolioData.category_3_id, existingValue.category_3_id),
                client_id: getUpdatedValue(portfolioData.client_id, existingValue.client_id)
            };
            const updatesql = `
        UPDATE portfolio
        SET template = ? , location = ?, area = ?, year = ?, cover = ?, highlight = ?,
            copy_1 = ?, copy_2 = ?, copy_3 = ?, copy_4 = ?, copy_5 = ?, copy_6 = ?,
            image_1 = ?, image_2 = ?, image_3 = ?, image_4 = ?, image_5 = ?, image_6 = ?,
            image_7 = ?, image_8 = ?, image_9 = ?, image_10 = ?, image_11 = ?, image_12 = ?,
            category_1_id = ?, category_2_id = ?, category_3_id = ?,client_id = ?
        WHERE id = ?`;
            const values = [
                updatedPortfolio.template,
                updatedPortfolio.location,
                updatedPortfolio.area,
                updatedPortfolio.year,
                updatedPortfolio.cover,
                updatedPortfolio.highlight,
                updatedPortfolio.copy_1,
                updatedPortfolio.copy_2,
                updatedPortfolio.copy_3,
                updatedPortfolio.copy_4,
                updatedPortfolio.copy_5,
                updatedPortfolio.copy_6,
                updatedPortfolio.image_1,
                updatedPortfolio.image_2,
                updatedPortfolio.image_3,
                updatedPortfolio.image_4,
                updatedPortfolio.image_5,
                updatedPortfolio.image_6,
                updatedPortfolio.image_7,
                updatedPortfolio.image_8,
                updatedPortfolio.image_9,
                updatedPortfolio.image_10,
                updatedPortfolio.image_11,
                updatedPortfolio.image_12,
                updatedPortfolio.category_1_id,
                updatedPortfolio.category_2_id,
                updatedPortfolio.category_3_id,
                updatedPortfolio.client_id,
                portfolioId
            ];
            connectDB_1.default.query(updatesql, values, (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(Object.assign({ id: portfolioId }, updatedPortfolio));
            });
        });
    });
});
exports.putPortfolioByIdService = putPortfolioByIdService;
const getallPortfolioService = () => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `
    SELECT 
    portfolio.*,
    client.id AS client_id,
    client.client_name AS client_name,
    category1.category_name AS category_name_1,
    category2.category_name AS category_name_2,
    category3.category_name AS category_name_3
    FROM 
        portfolio
    JOIN 
        client ON portfolio.client_id = client.id
    JOIN 
        category AS category1 ON portfolio.category_1_id = category1.id
    LEFT JOIN 
        category AS category2 ON portfolio.category_2_id = category2.id
    LEFT JOIN 
        category AS category3 ON portfolio.category_3_id = category3.id
  `;
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
exports.getallPortfolioService = getallPortfolioService;
const getPortfolioByIdService = (portfolioId) => __awaiter(void 0, void 0, void 0, function* () {
    const isNumericId = typeof portfolioId === 'number' || (!isNaN(Number(portfolioId)) && Number.isInteger(Number(portfolioId)));
    const sql = isNumericId
        ? `
      SELECT 
        portfolio.*, 
        client.id AS client_id, 
        client.client_name AS client_name, 
        category1.category_name AS category_name_1, 
        category2.category_name AS category_name_2, 
        category3.category_name AS category_name_3 
      FROM 
        portfolio 
      JOIN 
        client ON portfolio.client_id = client.id 
      JOIN 
        category AS category1 ON portfolio.category_1_id = category1.id 
      LEFT JOIN 
        category AS category2 ON portfolio.category_2_id = category2.id 
      LEFT JOIN 
        category AS category3 ON portfolio.category_3_id = category3.id 
      WHERE 
        portfolio.id = ?`
        : `
      SELECT 
        portfolio.*, 
        client.id AS client_id, 
        client.client_name AS client_name, 
        category1.category_name AS category_name_1, 
        category2.category_name AS category_name_2, 
        category3.category_name AS category_name_3 
      FROM 
        portfolio 
      JOIN 
        client ON portfolio.client_id = client.id 
      JOIN 
        category AS category1 ON portfolio.category_1_id = category1.id 
      LEFT JOIN 
        category AS category2 ON portfolio.category_2_id = category2.id 
      LEFT JOIN 
        category AS category3 ON portfolio.category_3_id = category3.id 
      WHERE 
        portfolio.slug = ?`;
    return new Promise((resolve, reject) => {
        connectDB_1.default.query(sql, [portfolioId], (error, result) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(result[0]);
            }
        });
    });
});
exports.getPortfolioByIdService = getPortfolioByIdService;
const deletePortfolioByIdService = (portfolioId) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = 'DELETE FROM portfolio WHERE id = ?';
    return new Promise((resolve, reject) => {
        connectDB_1.default.query(sql, [portfolioId], (error, result) => {
            if (error) {
                console.error('Error Deleting Portfolio: ', error);
                return reject(error);
            }
            if (result.affectedRows === 0) {
                return reject(new Error('Portfolio Not Found'));
            }
            resolve();
        });
    });
});
exports.deletePortfolioByIdService = deletePortfolioByIdService;
const deleteAllPortfoliosService = () => __awaiter(void 0, void 0, void 0, function* () {
    const sql = 'DELETE FROM portfolio';
    return new Promise((resolve, reject) => {
        connectDB_1.default.query(sql, (error, result) => {
            if (error) {
                console.error('Error Deleting Portfolios: ', error);
                return reject(error);
            }
            const resetAutoIncrement = 'ALTER TABLE portfolio AUTO_INCREMENT = 1';
            connectDB_1.default.query(resetAutoIncrement, (error) => {
                if (error) {
                    console.error('Error resetting auto-increment counter: ', error);
                    return reject(error);
                }
                resolve();
            });
        });
    });
});
exports.deleteAllPortfoliosService = deleteAllPortfoliosService;
//# sourceMappingURL=portfolio.service.js.map