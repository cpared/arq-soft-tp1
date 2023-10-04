import express, { Application, Router } from 'express';
import router from './routes';
import { AppError, HttpCode } from './types/AppError';
import { rateLimit } from 'express-rate-limit'

const limiter = rateLimit({
	windowMs: 60 * 1000, // 60 sconds
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
	// store: ... , // Use an external store for more precise rate limiting
})

export class App {
  private app: Application;
  public server: any;

  constructor() {
    this.app = express();
    this.app.use(limiter);
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
