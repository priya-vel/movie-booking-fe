import { HttpClient } from "./http";

class Auth extends HttpClient {
  constructor() {
    super();
  }
  async login(body: { email: string; password: string }) {
    return this.httpClient.post("/auth/login", body);
  }
  async register(body: { email: string; name: string; type: string; password: string }) {
    return this.httpClient.post("/auth/register", body);
  }
}

export const AuthService = new Auth();
