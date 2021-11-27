import { FC } from "react";
import { AuthStore } from "../../../stores/auth";
import style from "./auth-form.module.scss";

export interface AuthFormProps {
  type: "login" | "register"
}

export const AuthForm: FC<AuthFormProps> = (props) => {
  const authStore = AuthStore.useContainer();
  return (
  <div className={style.authForm}>

  </div>
  );
};
