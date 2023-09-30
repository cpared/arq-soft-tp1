export interface ISpaceflightService {
  getNews(): Promise<string>;
}

export class SpaceflightService {
  public static create(): ISpaceflightService {
    return new SpaceflightService();
  }

  public async getNews() {
    return 'Service: these are the news';
  }
}
