import { Request, Response, NextFunction } from "express";
import { AppError, HttpCode } from "../types/AppError";
import { AxiosError } from "axios";
import { sendMetrics } from "./metricsService";

const axios = require('axios');


enum Url {
    PATH = 'https://api.quotable.io/quotes/random?limit=1',
  }
  
  class QuoteService {

    public async getQuote(req: Request, res: Response, next: NextFunction) {
      try {
        const stationParam: any = req.query.station;

        const startExternalApiTime = Date.now();
        const resp = await axios.get('https://api.quotable.io/quotes/random?limit=1');
        const endExternalApiTime = Date.now();
        const totalTime = endExternalApiTime - startExternalApiTime;
        sendMetrics('quote-external-response-time', totalTime);

        res.status(HttpCode.OK).send(resp.data[0].content);
  
      } catch(err) {
        // check 429 status code
        if (err instanceof AxiosError && err.response && err.response.status === 429) {
          res.status(HttpCode.TOO_MANY_REQUESTS).send(err);         
        } else {
          res.status(HttpCode.INTERNAL_SERVER_ERROR).send(err); // No deberia enviar el error crudo
          next(err);
        }
      }
    }
  
  }
  
  export const quoteService = new QuoteService();
  