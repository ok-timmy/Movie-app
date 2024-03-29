import "../styles/globals.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Script from "next/script";
import { ContextWrapper } from "../Context/ContextWrapper";
import { navBarLinks } from "../Components/NavLinks";

function MyApp({ Component, pageProps }) {
 
  return (
    <>
    <ContextWrapper >
      <Header navBarLinks={navBarLinks}/>
      <Component {...pageProps} />
      <Footer />
      <Script />
      </ContextWrapper>
    </>
  );
}

export default MyApp;
