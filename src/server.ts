import express from 'express';
import morgan from 'morgan';

import apiRouter from './routers/apiRouter.js';

class Server {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config(){

        // Settings
        this.app.set('port', 3000);

        // Middelwares
        this.app.use(express.json);
        this.app.use(morgan('dev'));
    }

    routes(){
        this.app.use(apiRouter);
    }

    start(){
        this.app.listen(this.app.get('port'), () => {
            console.log('Server listen on port', this.app.get('port'));
        })
    }
}

const server = new Server();
server.start();