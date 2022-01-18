import "../styles/globals.css";
import NavBar from "../components/nav/navbar";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
