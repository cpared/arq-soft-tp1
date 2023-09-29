import { Request, Response } from 'express';
import { ISpaceflightService, SpaceflightService } from '../services/spaceflight';

export class IndexController {
  public getPing(req: Request, res: Response) {
    res.send('Pong');
  }
  public getIndex(req: Request, res: Response): void {
    res.send('Hello, World!');
  }
}


export class SpaceflightController {

  spaceflightService: ISpaceflightService;

  
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