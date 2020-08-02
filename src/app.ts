require('./config/config');

import express, { Application } from 'express';
import morgan from 'morgan';

import { tokenValidation } from './middlewares/authentication';
import { checkVersionFlutterApp } from './middlewares/check_version_flutter';

import IndexRoutes from './routes/index.routes';
import LoginRoutes from './routes/login.routes';

import RoleRoutes from './routes/role.routes';
import UnitRoutes from './routes/unit.routes';
import CategoryRoutes from './routes/category.routes';



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

    settings() {
        this.app.set('port', this.port || process.env.PORT || 3000);
    }

    middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(express.urlencoded({extended: false}));
    }

    public async listen() {
        await this.app.listen(this.app.get('port'));
        console.log('Server on port', this.app.get('port'));
    }


    routes() {
        this.app.use(IndexRoutes);

        this.app.use('/login', checkVersionFlutterApp, LoginRoutes);
        this.app.use('/role', checkVersionFlutterApp, tokenValidation, RoleRoutes);
        this.app.use('/unit', checkVersionFlutterApp, tokenValidation, UnitRoutes);
        this.app.use('/category', checkVersionFlutterApp, tokenValidation, CategoryRoutes);
    }

}