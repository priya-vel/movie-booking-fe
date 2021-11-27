import { HttpClient } from "./http";

class Theater extends HttpClient {
  constructor() {
    super();
  }
  async getTheater() {
    return this.httpClient.get("/theater/my");
  }
  async createTheater(body: { name: string }) {
    return this.httpClient.post("/theater", body);
  }
}

export const TheaterService = new Theater();
