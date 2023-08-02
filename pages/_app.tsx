import "../styles/globals.css";
import localFont from "next/font/local";

import type { AppProps } from "next/app";
import { Web3ContextProvider } from "../context";
import { ToastContainer } from "react-toastify";
import { NavBar } from "../components";

import "react-toastify/dist/ReactToastify.css";
import 'reactjs-popup/dist/index.css';

(BigInt.prototype as any).toJSON = function () {
  return Number(this)
  };
  
const fontGTAmericaMono = localFont({src: "./fonts/GT-America-Mono-Regular.woff2", variable: "--font-gt-america"});

function myApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${fontGTAmericaMono.style.fontFamily};
        }
      `}</style>
      <Web3ContextProvider>
        <div className={`min-h-screen	bg-fixed bg-[url('/background-game.png')] bg-cover ${fontGTAmericaMono.variable} font-sans`}>
          <NavBar />
          <Component {...pageProps} />
          <ToastContainer
            hideProgressBar
            position='bottom-right'
            autoClose={2000}
            />
        </div>
      </Web3ContextProvider>
    </>
  );
}

export default myApp
