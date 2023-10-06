import { Request, Response, NextFunction } from 'express';
import { AppError, HttpCode } from '../types/AppError';
import { AxiosError } from 'axios';
import { sendMetrics } from './metricsService';

const axios = require('axios');

enum Url {
  PATH = 'https://api.quotable.io/quotes/random?limit=1'
}

class QuoteService {
  public async getQuote(req: Request, res: Response, next: NextFunction) {
    try {
      const stationParam: any = req.query.station;

      const startExternalApiTime = Date.now();
      const resp = await axios.get(
        'https://api.quotable.io/quotes/random?limit=1'
      );
      const endExternalApiTime = Date.now();
      const totalTime = endExternalApiTime - startExternalApiTime;
      sendMetrics('quote-external-response-time', totalTime);

      res.status(HttpCode.OK).send(resp.data[0].content);
    } catch (err) {
      // check 429 status code
      if (
        err instanceof AxiosError &&
        err.response &&
        err.response.status === 429
      ) {
        next(
          new AppError({
            httpCode: HttpCode.TOO_MANY_REQUESTS,
            description: 'External API is returning 429'
          })
        );
      } else {
        next(err);
      }
    }
  }

  private buildURL() {
    return `${Url.PATH}`;
  }
}

export const quoteService = new QuoteService();
