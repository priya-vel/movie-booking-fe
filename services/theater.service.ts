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
  async getOne(id: string) {
    return this.httpClient.get(`/theater/${id}`);
  }
  async updateName(id: string, name: string) {
    return this.httpClient.put(`/theater/${id}`, {name});
  }
  async getShows(id: string) {
    return this.httpClient.get(`/theater/${id}/shows`)
  }
}

export const TheaterService = new Theater();
