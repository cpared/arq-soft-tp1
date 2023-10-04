import { Request, Response, NextFunction, response } from "express";
import { AppError, HttpCode } from "../types/AppError";
import * as redis from 'redis';
import {cacheService} from './cacheService';


//IMPORTANTE: La API se actualiza cada 10 minutos

const axios = require('axios');


enum Url {
    PATH = 'https://api.spaceflightnewsapi.net/v3/articles?_limit=5',
  }
  
  class SpaceService {

    public async getNews(req: Request, res: Response, next: NextFunction) {

      cacheService.handleCache('Spaceflight', 'https://api.spaceflightnewsapi.net/v3/articles?_limit=5', req, res, next, 10);

      // try {
      //   //Creo un cliente redis y espero a que conecte
      //   const client = redis.createClient();
      //   await client.connect();

      //   const stationParam: any = req.query.station;
        

      //   //Chequeo la conexion
      //   client.on('connect', () => {
      //     console.log('Cliente Redis conectado');
      //   });

      //   client.on('error', (err) => {
      //     console.error('Error en el cliente Redis:', err);
      //   });
        
      //   const value = await client.get("SpaceNews");

      //   if(value){
      //     res.status(HttpCode.OK).send(value);
      //   }else{

      //     const resp = await axios.get('https://api.spaceflightnewsapi.net/v3/articles?_limit=5');
      //     const titleArray = resp.data.map(function (news: { title: any; }) {return news.title});
  
      //     //Almaceno la respuesta en redis y chequeo que se alla guardado adecuadamente
      //     client.set("SpaceNews", JSON.stringify(titleArray));
      //     //const value = await client.get("SpaceNews");
      //     console.log(value);
  
      //     res.status(HttpCode.OK).send(titleArray);
      //   }

      //   client.quit();
        
  
      // } catch(err) {
      //   res.status(HttpCode.INTERNAL_SERVER_ERROR).send(err); // No deberia enviar el error crudo
      //   next(err);
      // }
    }
  
  }
  
  export const spaceService = new SpaceService();