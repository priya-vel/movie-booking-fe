import { FC, useEffect, useMemo, useState } from "react";
import { AuthStore } from "../../../stores/auth";
import { Btn } from "../../ui/btn/btn";
import { FormInput } from "../form-input/form-input";
import style from "./auth-form.module.scss";

export interface AuthFormProps {
  type: "login" | "register";
}

export const AuthForm: FC<AuthFormProps> = (props) => {
  const [formType, setFormType] = useState(props.type as "login" | "register");
  const authStore = AuthStore.useContainer();
  const title = {
    login: "Login",
    register: "Register",
  };
  const btn = {
    login: "Login",
    register: "Register",
  };

  const submitHandle = () => {
    if (formType == "login") {
      authStore.login();
    } else {
      authStore.register();
    }
  };

  useEffect(() => {
    return () => {
      authStore.setForm({
        email: '',
        name: '',
        password: '',
        type: 'user'
      })
    }
  },[])

  return (
    <form
      className={style.authForm}
      onSubmit={(e) => {
        e.preventDefault();
        submitHandle();
      }}
    >
      <h1>{title[formType]}</h1>

      <div>
        <FormInput
          value={authStore.form.email}
          placeHolder={"Email"}
          label={"Email"}
          id="email"
          required
          onChange={(e) => authStore.setForm({ ...authStore.form, email: e })}
        />
        {formType != "login" ? (
          <FormInput
            id="name"
            value={authStore.form.name}
            placeHolder={"User Name"}
            label={"User Name"}
            required
            onChange={(e) => authStore.setForm({ ...authStore.form, name: e })}
          />
        ) : (
          <></>
        )}
        <FormInput
          required
          id="password"
          value={authStore.form.password}
          placeHolder={"Password"}
          label={"Password"}
          type="password"
          onChange={(e) =>
            authStore.setForm({ ...authStore.form, password: e })
          }
        />
      </div>
      {formType == "register" ? (
        <div>
          <label className={style.userType}>User Type: </label>
          <select
            name="type"
            id="type"
            onChange={(e) => {
              authStore.setForm({ ...authStore.form, type: e.target.value });
            }}
          >
            {["user", "owner"].map((el, i) => (
              <option key={i} value={el}>
                {el}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <></>
      )}

      <div className={style.helper}>
        {formType == "login" ? (
          <div>
            dont have an account?{" "}
            <span
              className={style.link}
              onClick={() => setFormType("register")}
            >
              register
            </span>
          </div>
        ) : (
          <div>
            already have an account?{" "}
            <span className={style.link} onClick={() => setFormType("login")}>
              login
            </span>
          </div>
        )}
      </div>

      <Btn block type="submit">
        {btn[formType]}
      </Btn>
    </form>
  );
};
