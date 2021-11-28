import { HttpClient } from "./http";

class Shows extends HttpClient {
  constructor() {
    super();
  }
  create(body: {
    name: string;
    trailer: string;
    time: string;
    poster: string;
    theaater: string;
  } | any) {
    return this.httpClient.post(`/show`, body);
  }
  update(id: any, body: any) {
    return this.httpClient.put(`/show/${id}`, body)
  }
  getOne(id: string) {
    return this.httpClient.get(`/show/${id}`)
  }
  getAll() {
    return this.httpClient.get(`/show`)
  }
  booking(id: string) {
    return this.httpClient.put(`/show/${id}/book`)
  }
}

export const ShowService = new Shows();
