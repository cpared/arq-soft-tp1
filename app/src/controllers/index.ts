import { Request, Response } from 'express';

export class IndexController {
  public getPing(req: Request, res: Response) {
    res.send('Pong');
  }
  public getIndex(req: Request, res: Response): void {
    res.send('Hello, World!');
  }
}