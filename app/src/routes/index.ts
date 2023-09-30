import { Request, Response, NextFunction, Router } from 'express';
import { indexController, spaceflightController, metarController } from '../controllers';
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

router.get('/space', (req: Request, res: Response) => {
  spaceflightController.getIndex(req, res);
});

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log('Error encountered:', err.message || err);

  next(err);
});

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler.handleError(err, res);
});

export default router;