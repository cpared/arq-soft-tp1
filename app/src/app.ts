import express, { Application, Router } from 'express';
import router from './routes';
import { AppError, HttpCode } from './types/AppError';

export class App {
  private app: Application;
  public server: any;

  constructor() {
    this.app = express();
    this.setupMiddleware();
  }

  private setupMiddleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  public setRouter(router: Router){
    this.app.use(router);
    this.app.all('*', (req, res, next) => {
      next(new AppError({description: `Route ${req.originalUrl} not found`, httpCode: HttpCode.NOT_FOUND}));
    });
  }

  public start(port: number) {
    this.app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  }
}

const app = new App();
app.setRouter(router);
app.start(3000);