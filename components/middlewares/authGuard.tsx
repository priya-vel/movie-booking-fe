import { useRouter } from "next/dist/client/router";
import { FC, useEffect } from "react";
import { AuthStore } from "../../stores/auth";
import { AuthForm } from "../forms/auth-form/auth-form";

export const AuthGuard: FC = (_props) => {
  const authStore = AuthStore.useContainer();
  useEffect(() => {
    if (!!!authStore.user) {
      authStore.getProfile().catch((err) => console.error(err));
    }
  }, []);
  return !!authStore.user ? (
    <div>{_props.children}</div>
  ) : (
    <div>
      <AuthForm type="login" />
    </div>
  );
};

export interface AuthLevelPrope {
  type: string[];
}

export const AuthLevel: FC<AuthLevelPrope> = (props) => {
  const authStore = AuthStore.useContainer();
  const router = useRouter();
  useEffect(() => {
    if (authStore.user) {
      if (!props.type.includes(authStore.user.type)) {
        router.push("/");
      }
    }
  }, []);

  if (!!!authStore.user) {
    return <>loading...</>;
  }

  return props.type.includes(authStore.user.type) ? (
    <div>{props.children}</div>
  ) : (
    <>loading...</>
  );
};
