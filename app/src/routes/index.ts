import { Request, Response, NextFunction, Router } from 'express';
import { indexController, spaceflightController, metarController, quoteController } from '../controllers';
import { errorHandler } from '../middlewares/ErrorHandler';
import 'express-async-errors';

const router = Router();

router.get('/ping', (req: Request, res: Response) => {
  indexController.getPing(req, res);
});

router.get('/', (req: Request, res: Response) => {
  indexController.getIndex(req, res);
});

router.get('/metar', (req: Request, res: Response, next: NextFunction) => {
  metarController.getMetar(req, res, next);
});

router.get('/quote', (req: Request, res: Response, next: NextFunction) => {
  quoteController.getQuote(req, res, next);
});


router.get('/spaceflight_news', (req: Request, res: Response, next: NextFunction) => {
  spaceflightController.getNews(req, res, next);
});

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log('Error encountered:', err.message || err);

  next(err);
});

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler.handleError(err, res);
});

export default router;