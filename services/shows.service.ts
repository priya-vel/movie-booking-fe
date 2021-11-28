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
  }) {
    return this.httpClient.post(`/theater`, body);
  }
}

export const ShowService = new Shows();
