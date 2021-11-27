import { useRouter } from "next/dist/client/router";
import { string } from "prop-types";
import { useState } from "react";
import { createContainer } from "unstated-next";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";
import { encryptSha512 } from "../util/encrypt";

const Auth = () => {
  const router = useRouter();
  const [user, setUser] = useState(null as null | {
    email: string,
    name: string,
    type: "user" | "owner"
  });
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
    type: "user"
  });
  const login = async () => {
    return AuthService.login({
      email: form.email, password: encryptSha512(form.password),
    }).then(async (res) => {
      return getProfile().then(res => {
        if(res.type == "owner") {
          router.push("/theater/")
        }
      }).catch(_ => {});
    }).catch(err => {
      console.log(err);
      return err;
    })
  };form.password
  const logout = async () => {
    localStorage.clear();
    setUser(null)
  };
  const register = async () => {
    return AuthService.register({
      email: form.email,
      name: form.name,
      type: form.type,
      password: encryptSha512(form.password),
    }).then(res => {
      return getProfile().then(res => {
        if(res.type == "owner") {
          router.push("/theater/")
        }
      }).catch(_ => {});
    }).catch(err => {
      console.log(err);
      return err;
    })
  };
  const getProfile = () => {
    return UserService.profile().then(res => {
      setUser(res.data.data)
      return res.data.data
    }).catch(err => {
      console.log(err);
      return Promise.reject(err)
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
