import express from 'express';
import apiRouter from './routers/apiRouter';
class Server {
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }
    config() {
        // Settings
        this.app.set('port', 3000);
        // Middelwares
        this.app.use(express.json);
    }
    routes() {
        this.app.use(apiRouter);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server listen on port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
//# sourceMappingURL=server.js.map