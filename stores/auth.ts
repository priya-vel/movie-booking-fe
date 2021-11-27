import { useState } from "react";
import { createContainer } from "unstated-next";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";
import { encryptSha512 } from "../util/encrypt";

const Auth = () => {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
    type: "user"
  });
  const login = async () => {
    return AuthService.login({
      email: form.email, password: encryptSha512(form.password),
    }).then((res) => {
      console.log(res);
      return res;
    }).catch(err => {
      console.log(err);
      return err;
    })
  };form.password
  const logout = async () => {};
  const register = async () => {
    return AuthService.register({
      email: form.email,
      name: form.name,
      type: form.type,
      password: encryptSha512(form.password),
    }).then(res => {
      console.log(res);
      getProfile();
      return
    }).catch(err => {
      console.log(err);
      return err;
    })
  };
  const getProfile = () => {
    return UserService.profile().then(res => {
      setUser(res.data.data)
    }).catch(err => {
      console.log(err);
    })
  }
  return {
    form,
    setForm,
    user,
    login,
    logout,
    register,
    getProfile
  };
};

export const AuthStore = createContainer(Auth);
