import { GraphQLNonNull } from "graphql";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import LoginAuthPrompt from "../components/LoginAuthPrompt";
import RegisterAuthPrompt from "../components/RegisterAuthPrompt";
import SideBar from "../components/SideBar";
import TweetFeed from "../components/TweetFeed";

export type authStatusType = "registered" | "logged" | null;

const Home: NextPage = () => {
  const [loginState, setLoginState] = useState<authStatusType>(null);
  const cb = (isAuthenticated: authStatusType) => {
    if(isAuthenticated === null){
      setLoginState(null);
    } else if (isAuthenticated === "registered") {
      setLoginState("registered");
    } else if (isAuthenticated === "logged") {
      setLoginState(isAuthenticated);
    } else {
      console.log("Please Login Or Register");
    }
  };
  return (
    <>
      <Head>
        <title>Twitter</title>
      </Head>
      <div className="h-screen w-screen bg-black flex flex-row overflow-y-hidden">
        {(() => {
          if (loginState === null) {
            return (
              <RegisterAuthPrompt
                cb={cb}
                style={
                  loginState === null
                    ? "absolute left-0 right-0 top-0 bottom-0 text-center"
                    : "hidden"
                }
              />
            );
          } else if (loginState === "registered") {
            return (
              <LoginAuthPrompt
                cb={cb}
                style={
                  loginState === null || loginState === "registered"
                    ? "absolute left-0 right-0 top-0 bottom-0 text-center"
                    : "hidden"
                }
              />
            );
          } else {
            return <div></div>;
          }
        })()}

        <SideBar />
        <TweetFeed />
        <div className="hidden flex-1 md:flex justify-center pt-5">
          <button
            placeholder="SignIn"
            className="w-1/2 max-h-10 rounded-2xl border-2 border-textWhiteH text-textWhite"
            onClick={() => {setLoginState("registered")}}
          >
            {loginState === null ? "Sign In" : "Sign Out"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
