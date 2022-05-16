import "../styles/globals.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Script from "next/script";
// import Popper from 'popper.js'
// import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
      <Script />
    </>
  );
}

export default MyApp;
