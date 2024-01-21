import "../styles/globals.css";
import localFont from "next/font/local";

import type { AppProps } from "next/app";
import { Web3ContextProvider } from "../context";
import { ToastContainer } from "react-toastify";
import { NavBar } from "../components";

import "react-toastify/dist/ReactToastify.css";
import "reactjs-popup/dist/index.css";

(BigInt.prototype as any).toJSON = function () {
  return Number(this);
};

const fontGTAmericaMono = localFont({
  src: "./fonts/GT-America-Mono-Regular.woff2",
  variable: "--font-gt-america",
});

function myApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${fontGTAmericaMono.style.fontFamily};
        }
      `}</style>
      {process.env.NEXT_PUBLIC_NETWORK_ID !== "1" && (
        <div className='h-6 bg-red-500 text-center'>
          {" "}
          {process.env.NEXT_PUBLIC_NETWORK_NAME}{" "}
        </div>
      )}

      <Web3ContextProvider>
        <div
          className={`min-h-screen bg-[url('/background-game.png')] bg-cover bg-fixed ${fontGTAmericaMono.variable} font-sans`}
        >
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

export default myApp;
