import "../styles/globals.css";
import { AuthStore } from "../stores/auth";
import { DefaultLayout } from "../components/layouts/default/default";

function MyApp({ Component, pageProps }: any) {

  const Layout = (child: any) => {
    switch (Component.layout) {
      case "special":
        return child
      default:
        return <DefaultLayout>
        {child}
      </DefaultLayout>
    }
  }

  return (
    <AuthStore.Provider>
      {Layout(<Component {...pageProps} />)}
    </AuthStore.Provider>
  );
}

export default MyApp;
