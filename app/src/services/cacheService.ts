import { NextFunction, Request, Response } from 'express';
import { AppError, HttpCode } from '../types/AppError';
import * as redis from 'redis';
import axios from 'axios';

class CacheService {

    public async handleCache(key: string, url: string, req: Request, res: Response, next: NextFunction, tiempo: number){
        try {
            //Creo un cliente redis y espero a que conecte
            const client = redis.createClient({host: 'redis', port: 6379});
            await client.connect();

            //Chequeo la conexion
            client.on('connect', () => {
                console.log('Cliente Redis conectado');
            });

            client.on('error', (err) => {
                console.error('Error en el cliente Redis:', err);
            });

            const value = await client.get(key);

            if (value) {
                res.status(HttpCode.OK).send(value);
            } else {

                const resp = await axios.get(url);
                const titleArray = resp.data.map(function (news: { title: any; }) { return news.title });

                //Almaceno la respuesta en redis y chequeo que se alla guardado adecuadamente
                client.set(key, JSON.stringify(titleArray));
                //const value = await client.get("SpaceNews");
                console.log(value);

                client.expire(key, tiempo);

                res.status(HttpCode.OK).send(titleArray);
            }

            client.quit();


        } catch (err) {
            res.status(HttpCode.INTERNAL_SERVER_ERROR).send(err); // No deberia enviar el error crudo
            next(err);
        }
    }
}

export const cacheService = new CacheService();
