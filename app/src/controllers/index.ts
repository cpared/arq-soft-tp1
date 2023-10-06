import { NextFunction, Request, Response } from 'express';
import { spaceService } from '../services/spaceflight';
import { metarService } from '../services/metarService';
import { quoteService } from '../services/quoteService';
import { sendMetrics } from '../services/metricsService';

export class IndexController {
  public getPing(req: Request, res: Response) {
    const initialTime = Date.now();
    res.send('Pong');
    const finalTime = Date.now();

    const totalTime = finalTime - initialTime;
    console.log('Response time:', totalTime);
    sendMetrics('ping-response-time', totalTime);
  }
  public getIndex(req: Request, res: Response): void {
    res.send('Hello, World!');
  }
}

class MetarController {
  public async getMetar(req: Request, res: Response, next: NextFunction) {
    const initialTime = Date.now();
    const response = await metarService.getMetar(req, res, next);
    const finalTime = Date.now();

    const totalTime = finalTime - initialTime;
    console.log('Response time:', totalTime);
    sendMetrics('metar-response-time', totalTime);

    return response;
  }
}

class QuoteController {
  public async getQuote(req: Request, res: Response, next: NextFunction) {
    const initialTime = Date.now();
    const response = await quoteService.getQuote(req, res, next);
    const finalTime = Date.now();

    const totalTime = finalTime - initialTime;
    console.log('Response time:', totalTime);
    sendMetrics('quote-response-time', totalTime);

    return response;
  }
}

class SpaceController {
  public async getNews(req: Request, res: Response, next: NextFunction) {
    const initialTime = Date.now();
    const response = await spaceService.getNews(req, res, next);
    const finalTime = Date.now();

    const totalTime = finalTime - initialTime;
    console.log('Response time:', totalTime);
    sendMetrics('space-response-time', totalTime);

    return response;
  }
}

export const metarController = new MetarController();
export const indexController = new IndexController();
export const spaceflightController = new SpaceController();
export const quoteController = new QuoteController();
