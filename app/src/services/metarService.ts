import { Request, Response, NextFunction } from "express";
import { AppError, HttpCode } from "../types/AppError";
import { sendMetrics } from "./metricsService";

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

      const startExternalApiTime = Date.now();
      const resp = await axios.get(this.buildURL(stationParam));
      const endExternalApiTime = Date.now();
      const totalTime = endExternalApiTime - startExternalApiTime;
      sendMetrics('metar-external-response-time', totalTime);

      
      const parsed = this.parser.parse(resp.data);

      if (parsed.response.data === '') {
        return res.status(404).send('No data found to this station');
      }

      let metarData = parsed.response.data.METAR;
      if(parsed.response.data.METAR.length > 1){
        metarData = parsed.response.data.METAR[0];
      }

      const parsedResp = decode(metarData.raw_text);

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
