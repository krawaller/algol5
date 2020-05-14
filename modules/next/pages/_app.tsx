import { AppProps } from "next/app";
import { pageActions } from "../helpers/pageActions";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
