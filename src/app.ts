require('./config/config');
import express, { Application } from 'express';
import morgan from 'morgan';

import IndexRoutes from './routes/index.routes';
import CategoryRoutes from './routes/category.routes';
import LoginRoutes from './routes/login.routes';
import { tokenValidation } from './middlewares/authentication';


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

    routes() {
        this.app.use(IndexRoutes);
        this.app.use('/login', LoginRoutes);
        this.app.use('/category', tokenValidation, CategoryRoutes);
    }

    public async listen() {
        await this.app.listen(this.app.get('port'));
        console.log('Server on port', this.app.get('port'));
    }

}