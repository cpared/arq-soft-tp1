import { Request, Response, NextFunction } from "express";
import { AppError, HttpCode } from "../types/AppError";

const axios = require('axios');


enum Url {
    PATH = 'https://api.spaceflightnewsapi.net/v3/articles?_limit=5',
  }
  
  class SpaceService {

    public async getNews(req: Request, res: Response, next: NextFunction) {
      try {
        const stationParam: any = req.query.station;
        const resp = await axios.get('https://api.spaceflightnewsapi.net/v3/articles?_limit=5');
        console.log(resp);

        const titleArray = resp.data.map(function (news: { title: any; }) {return news.title});

        res.status(HttpCode.OK).send(titleArray);
  
      } catch(err) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).send(err); // No deberia enviar el error crudo
        next(err);
      }
    }
  
  }
  
  export const spaceService = new SpaceService();