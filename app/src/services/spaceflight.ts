import { HttpService } from '../services/HTTP/HttpService';


export interface ISpaceflightService {
    getNews(): Promise<string[]>;
}

export class SpaceflightService implements ISpaceflightService {

    private readonly httpService: HttpService;
    private static instance: ISpaceflightService;

    constructor() {
        this.httpService = new HttpService('https://api.spaceflightnewsapi.net/v3/');
    }

    public static create() : ISpaceflightService {
      if (!SpaceflightService.instance) {
          SpaceflightService.instance = new SpaceflightService();
      }
      return SpaceflightService.instance;
    }
    
    public async getNews(): Promise<string[]> {
        try {
            const news = await this.httpService.get<{title:string}[]>('articles?_limit=5');
            return news.map((article: {title:string}) => article.title);            
        } catch (error) {
            console.error(error);
            return ["Error"] // TODO: throw error
        }
    }
}

