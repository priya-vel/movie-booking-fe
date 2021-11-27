import { useState } from "react";

const Auth = () => {
    const [user, setUser] = useState("");
    
    return {
        user,
    }
}

export const AuthStore = Auth;

