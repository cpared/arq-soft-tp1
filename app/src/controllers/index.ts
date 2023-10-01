import { NextFunction, Request, Response } from 'express';
import { spaceService } from '../services/spaceflight';
import { metarService } from '../services/metarService';
import { quoteService } from '../services/quoteService';

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


class QuoteController {
  public async getQuote(req: Request, res: Response, next: NextFunction){
    return quoteService.getQuote(req,res,next);
  }
}

class SpaceController {
  public async getNews(req: Request, res: Response, next: NextFunction){
    return spaceService.getNews(req,res,next);
  }
}

export const metarController = new MetarController();
export const indexController = new IndexController();
export const spaceflightController = new SpaceController();
export const quoteController = new QuoteController();
