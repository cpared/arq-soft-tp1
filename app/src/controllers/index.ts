import { Request, Response } from 'express';
import { SpaceflightService } from '../services/spaceflight';

export class IndexController {
  public getPing(req: Request, res: Response) {
    res.send('Pong');
  }
  public getIndex(req: Request, res: Response): void {
    res.send('Hello, World!');
  }
}


export class SpaceflightController {
  

  public async getIndex(req: Request, res: Response): Promise<void> {

    const service = SpaceflightService.create(); 

    const news = await service.getNews();

    res.send(news);
  }
}