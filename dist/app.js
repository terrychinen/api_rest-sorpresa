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
exports.App = void 0;
require('./config/config');
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const authentication_1 = require("./middlewares/authentication");
const check_version_app_1 = require("./middlewares/check_version_app");
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const token_routes_1 = __importDefault(require("./routes/token.routes"));
const document_routes_1 = __importDefault(require("./routes/document.routes"));
const commodity_routes_1 = __importDefault(require("./routes/commodity.routes"));
const role_routes_1 = __importDefault(require("./routes/role.routes"));
const unit_routes_1 = __importDefault(require("./routes/unit.routes"));
const store_routes_1 = __importDefault(require("./routes/store.routes"));
const stock_history_routes_1 = __importDefault(require("./routes/stock_history.routes"));
const category_routes_1 = __importDefault(require("./routes/category.routes"));
const brand_routes_1 = __importDefault(require("./routes/brand.routes"));
const quantity_routes_1 = __importDefault(require("./routes/quantity.routes"));
class App {
    constructor(port) {
        this.app = express_1.default();
        this.port = port;
        this.settings();
        this.middlewares();
        this.routes();
    }
    settings() { this.app.set('port', this.port || process.env.PORT || 3000); }
    middlewares() {
        this.app.use(morgan_1.default('dev'));
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.app.listen(this.app.get('port'), '0.0.0.0');
            console.log('Server on port', this.app.get('port'));
        });
    }
    routes() {
        this.app.use(index_routes_1.default);
        this.app.use('/auth', check_version_app_1.checkVersionFlutterApp, auth_routes_1.default);
        this.app.use('/token', check_version_app_1.checkVersionFlutterApp, token_routes_1.default);
        this.app.use('/document', document_routes_1.default);
        this.app.use('/commodity', check_version_app_1.checkVersionFlutterApp, authentication_1.tokenValidation, commodity_routes_1.default);
        this.app.use('/brand', check_version_app_1.checkVersionFlutterApp, authentication_1.tokenValidation, brand_routes_1.default);
        this.app.use('/category', check_version_app_1.checkVersionFlutterApp, authentication_1.tokenValidation, category_routes_1.default);
        this.app.use('/role', check_version_app_1.checkVersionFlutterApp, authentication_1.tokenValidation, role_routes_1.default);
        this.app.use('/unit', check_version_app_1.checkVersionFlutterApp, authentication_1.tokenValidation, unit_routes_1.default);
        this.app.use('/quantity', check_version_app_1.checkVersionFlutterApp, authentication_1.tokenValidation, quantity_routes_1.default);
        this.app.use('/store', check_version_app_1.checkVersionFlutterApp, authentication_1.tokenValidation, store_routes_1.default);
        this.app.use('/stock_history', check_version_app_1.checkVersionFlutterApp, authentication_1.tokenValidation, stock_history_routes_1.default);
    }
}
exports.App = App;
