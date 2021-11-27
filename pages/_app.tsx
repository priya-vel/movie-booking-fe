import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthStore } from "../stores/auth";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthStore.Provider>
      <Component {...pageProps} />
    </AuthStore.Provider>
  );
}

export default MyApp;
