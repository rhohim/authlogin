"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const user_route_1 = __importDefault(require("./user.route"));
const auth_route_1 = __importDefault(require("../routes/auth.route"));
const swaggerRoute_1 = __importDefault(require("../routes/swaggerRoute"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const _routes = [
    ['/api/user', user_route_1.default],
    ['/api', auth_route_1.default]
];
const routes = (app) => {
    _routes.forEach((route) => {
        const [url, router] = route;
        app.use(url, router);
    });
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerRoute_1.default));
};
exports.routes = routes;
//# sourceMappingURL=route.js.map