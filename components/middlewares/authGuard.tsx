import { FC, useEffect } from "react"
import { AuthStore } from "../../stores/auth"
import { AuthForm } from "../forms/auth-form/auth-form"

export const AuthGuard: FC = (_props) => {
    const authStore = AuthStore.useContainer()
    useEffect(() => {
        authStore.getProfile()
        .catch(err => console.error())
    }, [])
    return !!authStore.user ? <div>
        {_props.children}
    </div> : <div>
        <AuthForm type="login" />
    </div>
}


