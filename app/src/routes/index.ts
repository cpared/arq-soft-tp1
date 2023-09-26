import { Router } from 'express';
import { IndexController } from '../controllers';
import { Request, Response } from '../types';

export function setRoutes(router: Router): void {
  const indexController = new IndexController();

  router.get('/', (req: Request, res: Response) => {
    indexController.getIndex(req, res);
  });
  
  router.get('/ping', (req: Request, res: Response) => {
    // indexController.getPing(req, res);
    res.send('Pong');
  });
}