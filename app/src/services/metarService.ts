import { Request, Response, NextFunction } from "express";
import { AppError, HttpCode } from "../types/AppError";

const axios = require('axios');
const { XMLParser } = require('fast-xml-parser');
const { decode } = require('metar-decoder');

enum Url {
  PATH = 'https://www.aviationweather.gov/adds/dataserver_current/httpparam',
  DATA_SOURCE = 'dataSource',
  REQUEST_TYPE = 'requestType',
  FORMAT = 'format',
  STATION_STRING = 'stationString',
  HOURS_BEFORE_NOW = 'hoursBeforeNow'
}

class MetarService {
  private parser: any;

  constructor() {
    this.parser = new XMLParser();
  }

  public async getMetar(req: Request, res: Response, next: NextFunction) {
    try {
      const stationParam: any = req.query.station;
      const resp = await axios.get(this.buildURL(stationParam));
      const parsed = this.parser.parse(resp.data);
      const parsedResp = decode(parsed.response.data.METAR.raw_text);

      res.status(HttpCode.OK).send(parsedResp);

    } catch(err) {
      res.status(HttpCode.INTERNAL_SERVER_ERROR).send(err); // No deberia enviar el error crudo
      next(err);
    }
  }

  private buildURL(station: string) {
    return `${Url.PATH}?${Url.DATA_SOURCE}=metars&${Url.REQUEST_TYPE}=retrieve&${Url.FORMAT}=xml&${Url.STATION_STRING}=${station}&${Url.HOURS_BEFORE_NOW}=1`;
  }
}

export const metarService = new MetarService();
