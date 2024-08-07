import "../styles/globals.css";
import { wrapper } from "../redux/store/store.js";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect } from "react";
import NavBar from "../components/NavBar.jsx";
import { SessionProvider } from "next-auth/react";

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
})
  {
    useEffect(() => {
      import("bootstrap/dist/js/bootstrap");
    }, []);
  return (
    <>
      <SessionProvider session={session}>
        <NavBar></NavBar>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
