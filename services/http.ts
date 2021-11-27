import axios, { AxiosInstance } from "axios";
import { Config } from "../config/config";

export class HttpClient {
  httpClient!: AxiosInstance;
  constructor() {
    this.httpClient = axios.create({
      baseURL: Config.BASE_URL,
    });
    this.request();
    this.response();
  }
  private request() {
    this.httpClient.interceptors.request.use((req: any) => {
      let token = localStorage.getItem(Config.TOKEN);
      if (!!token) {
        req.headers["Authorization"] = `Barear ${token}`;
      } 
      return req
    }, err => {
      return err
    })
  }
  private response() {
    this.httpClient.interceptors.response.use((res: any) => {
      if (!!res.data.token) {
        localStorage.setItem(Config.TOKEN, res.data.token)
      }
      return res
    }, err => {
      return Promise.reject(err)
    })
  }
}
