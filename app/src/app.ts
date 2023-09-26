import express, { Application } from 'express';
import { setRoutes } from './routes';
import { Request, Response } from './types';

export class App {
  private app: Application;

  constructor() {
    this.app = express();
    this.setupMiddleware();
    setRoutes(this.app);
  }

  private setupMiddleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  public start(port: number) {
    this.app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  }
}

const app = new App();
app.start(3000);