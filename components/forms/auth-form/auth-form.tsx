import { AuthStore } from "../../../stores/auth";
import style from "./auth-form.module.scss";

export const AuthForm = () => {
  const authStore = AuthStore.useContainer();
  return (
  <div className={style.authForm}>

  </div>
  );
};
