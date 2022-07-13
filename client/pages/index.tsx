import type { NextPage } from "next";
import Head from "next/head";
import SideBar from "../components/SideBar";
import TweetFeed from "../components/TweetFeed";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Twitter</title>
      </Head>
      <div className="h-screen w-screen bg-black flex flex-row overflow-y-hidden">
        <SideBar />
        <TweetFeed />
        <div className="hidden flex-1 md:flex justify-center pt-5">
          <button
            placeholder="SignIn"
            className="w-1/2 max-h-10 rounded-2xl border-2 border-textWhiteH text-textWhite"
          >
            {true ? "Sign In" : "Sign Out"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
