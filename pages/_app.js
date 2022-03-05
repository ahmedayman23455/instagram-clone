import "../styles/main.scss";
import { SessionProvider } from "next-auth/react";
import store from "../redux-store/store";
import { Provider } from "react-redux";
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
