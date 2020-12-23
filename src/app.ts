require('./config/config');

import express, { Application } from 'express';
import morgan, { token } from 'morgan';

import { tokenValidation } from './middlewares/authentication';
import { checkVersionFlutterApp } from './middlewares/check_version_app';

import IndexRoutes from './routes/index.routes';
import AuthRoutes from './routes/auth.routes';
import TokenRoutes from './routes/token.routes';

import DocumentRoutes from './routes/document.routes';

import CommodityRoutes from './routes/commodity.routes'
import RoleRoutes from './routes/role.routes';
import UnitRoutes from './routes/unit.routes';
import StoreRoutes from './routes/store.routes';
import StockHistoryRoutes from './routes/stock_history.routes';
import CategoryRoutes from './routes/category.routes';
import BrandRoutes from './routes/brand.routes';
import QuantityRoutes from './routes/quantity.routes';



export class App {
    
    private app: Application;
    private port?: number | string;

    constructor(port?: number | string) {
        this.app = express();
        this.port = port;

        this.settings();
        this.middlewares();
        this.routes();
    }

    settings() {this.app.set('port', this.port || process.env.PORT || 3000);}

    middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(express.urlencoded({extended: false}));
    }

    public async listen() {
        await this.app.listen(this.app.get('port'), '0.0.0.0');
        console.log('Server on port', this.app.get('port'));
    }


    routes() {
        this.app.use(IndexRoutes);
        this.app.use('/auth', checkVersionFlutterApp, AuthRoutes);
        this.app.use('/token', checkVersionFlutterApp, TokenRoutes);
        this.app.use('/document', DocumentRoutes);
        this.app.use('/commodity', checkVersionFlutterApp, tokenValidation, CommodityRoutes);
        this.app.use('/brand', checkVersionFlutterApp, tokenValidation, BrandRoutes);
        this.app.use('/category', checkVersionFlutterApp, tokenValidation, CategoryRoutes);
        this.app.use('/role', checkVersionFlutterApp, tokenValidation, RoleRoutes);
        this.app.use('/unit', checkVersionFlutterApp, tokenValidation, UnitRoutes);
        this.app.use('/quantity', checkVersionFlutterApp, tokenValidation, QuantityRoutes);
        this.app.use('/store', checkVersionFlutterApp, tokenValidation, StoreRoutes);
        this.app.use('/stock_history', checkVersionFlutterApp, tokenValidation, StockHistoryRoutes);
    }

}