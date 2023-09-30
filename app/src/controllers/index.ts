import { NextFunction, Request, Response } from 'express';
import { SpaceflightService } from '../services/spaceflight';
import { metarService } from '../services/metarService';

export class IndexController {
  public getPing(req: Request, res: Response) {
    res.send('Pong');
  }
  public getIndex(req: Request, res: Response): void {
    res.send('Hello, World!');
  }
}

class MetarController {
  public async getMetar(req: Request, res: Response, next: NextFunction) {
    return metarService.getMetar(req, res, next);
  }
}

export class SpaceflightController {
  spaceflightService: SpaceflightService;

  /**
   *
   */
  constructor() {
    this.spaceflightService = SpaceflightService.create();
  }

  public async getIndex(req: Request, res: Response): Promise<void> {
    const news = await this.spaceflightService.getNews();

    res.send(news);
  }
}

export const metarController = new MetarController();
export const indexController = new IndexController();
export const spaceflightController = new SpaceflightController();