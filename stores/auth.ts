import { useState } from "react";
import { createContainer } from "unstated-next";

const Auth = () => {
  const [user, setUser] = useState({
    email: "",
    name: "",
    type: ""
  });
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
    type: ""
  });
  const login = async () => {};
  const logout = async () => {};
  const register = async () => {};
  return {
    form,
    setForm,
    user,
    login,
    logout,
    register,
  };
};

export const AuthStore = createContainer(Auth);
