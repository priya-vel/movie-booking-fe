import { HttpClient } from "./http"

class User extends HttpClient {
    constructor() {
        super()
    }
    async profile() {
        return this.httpClient.get("/user/profile/me")
    }
    async myBookings() {
        return this.httpClient.get("/user/my/bookings")
    }
}

export const UserService = new User();