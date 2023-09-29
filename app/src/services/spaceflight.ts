import { HttpService } from '../services/HTTP/HttpService';


export interface ISpaceflightService {
    getNews(): Promise<any>;
}


export class SpaceflightService {

    private readonly httpService: HttpService;


    constructor() {
        this.httpService = new HttpService('https://api.spaceflightnewsapi.net/v3/');
    }

    public static create() : ISpaceflightService {
        return new SpaceflightService();
    }
    
    public async getNews() {
        try {
            const news = await this.httpService.get('articles?_limit=2');
            return news;
            
        } catch (error) {
            console.error(error);
            return "Error"
        }
    }
}

