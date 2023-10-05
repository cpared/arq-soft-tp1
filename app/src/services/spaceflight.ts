import { Request, Response, NextFunction, response } from "express";
import { AppError, HttpCode } from "../types/AppError";
import * as redis from 'redis';
import {cacheService} from './cacheService';


//IMPORTANTE: La API se actualiza cada 10 minutos

const axios = require('axios');

  class SpaceService {

    private readonly url: string = 'https://api.spaceflightnewsapi.net/v3/articles?_limit=5';
    private readonly expiresSeconds: number = 10;

    public async getNews(req: Request, res: Response, next: NextFunction) {      
      try {        
        const valueInCache = await cacheService.get('Spaceflight');
        
        if(valueInCache){
          console.log('cache response', valueInCache);
          res.status(HttpCode.OK).send(valueInCache);
        }else{
          const resp = await axios.get(this.url);
          const titleArray = resp.data.map((news: { title: string; }) => news.title);
  
          //Almaceno la respuesta en redis y chequeo que se alla guardado adecuadamente
          cacheService.set('Spaceflight', JSON.stringify(titleArray), this.expiresSeconds);
  
          res.status(HttpCode.OK).send(titleArray);
        }  
      } catch(err) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).send(err); // No deberia enviar el error crudo
        next(err);
      }
    }
  
  }
  
  export const spaceService = new SpaceService();