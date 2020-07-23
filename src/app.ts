import express, { Application } from 'express';
import morgan from 'morgan';

export class App {
    
    private app: Application;
    private port?: number | string;

    constructor(port?: number | string) {
        this.app = express();
        this.port = port;

        this.settings();
        this.middlewares();
    }


    settings() {
        this.app.set('port', this.port || process.env.PORT || 3000);
    }

    middlewares() {
        this.app.use(morgan('dev'));
    }

    public async listen() {
        await this.app.listen(this.app.get('port'));
        console.log('Server on port', this.app.get('port'));
    }

}