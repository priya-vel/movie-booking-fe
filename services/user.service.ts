import { HttpClient } from "./http"

class User extends HttpClient {
    constructor() {
        super()
    }
    async profile() {
        return this.httpClient.get("/user/profile/me")
    }
}

export const UserService = new User();