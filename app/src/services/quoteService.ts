import { Request, Response, NextFunction } from "express";
import { AppError, HttpCode } from "../types/AppError";

const axios = require('axios');


enum Url {
    PATH = 'https://api.quotable.io/quotes/random?limit=1',
  }
  
  class QuoteService {

    public async getQuote(req: Request, res: Response, next: NextFunction) {
      try {
        const stationParam: any = req.query.station;
        const resp = await axios.get('https://api.quotable.io/quotes/random?limit=1');

        res.status(HttpCode.OK).send(resp.data[0].content);
  
      } catch(err) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).send(err); // No deberia enviar el error crudo
        next(err);
      }
    }
  
    private buildURL() {
      return `${Url.PATH}`;
    }
  }
  
  export const quoteService = new QuoteService();
  