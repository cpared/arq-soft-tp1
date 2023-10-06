import axios, { AxiosResponse } from 'axios';

export class HttpService {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public async get<T>(url: string): Promise<T> {
    const response: AxiosResponse<T> = await axios.get(`${this.baseUrl}${url}`);
    return response.data;
  }

  public async post<T>(url: string, data: any): Promise<T> {
    const response: AxiosResponse<T> = await axios.post(
      `${this.baseUrl}${url}`,
      data
    );
    return response.data;
  }
}
