import type { NextPage } from "next";
import Head from "next/head";
import { GameMap2 } from "../components";

const Home: NextPage = () => {  
  return (
    <div className="">
      <Head>
        <title>Moon Ape Labs</title>
        <link rel="icon" href="favicon.png" />
      </Head>
      <main className="grid place-items-center">
        <GameMap2 />
      </main>
    </div>
  )
}

export default Home;
