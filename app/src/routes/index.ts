import { Router } from 'express';
import { IndexController, SpaceflightController } from '../controllers';
import { Request, Response } from '../types';

export function setRoutes(router: Router): void {

  setSpaceflightRoutes(router);


  const indexController = new IndexController();
  
  router.get('/', (req: Request, res: Response) => {
    indexController.getIndex(req, res);
  });
  
  router.get('/ping', (req: Request, res: Response) => {
    indexController.getPing(req, res);
  });  
}



function setSpaceflightRoutes(router: Router) {
  const spaceflightController = new SpaceflightController();

  
  router.get('/space', (req: Request, res: Response) => {
    spaceflightController.getIndex(req, res);
  });
}

