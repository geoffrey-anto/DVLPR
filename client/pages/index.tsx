import { useMutation } from "@apollo/client";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import AuthPrompt from "../components/AuthPrompt";
import SideBar from "../components/SideBar";
import TweetFeed from "../components/TweetFeed";
import { LOGIN_USER_WITH_ID_NAME } from "../graphql/Mutation";

const Home: NextPage = () => {
  const [loginState, setLoginState] = useState<any>(null);

  const [loginUser, { data, error, loading }] = useMutation(
    LOGIN_USER_WITH_ID_NAME
  );

    const signOut = async () => {
      setLoginState(null);
    };

  const loginUserHandler = async () => {
    if (loginState !== null) {
      signOut();
      return;
    }
    try {
      const data = await loginUser({
        variables: {
          loginInput: {
            email: "sandask@njdsf.com",
            password: "aaaaaa",
          },
        },
      });
      setLoginState(data.data.Login);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  if (loading) {
    return (
      <div className="w-screen h-screen bg-black flex items-center justify-center">
        <p className="text-textWhiteH text-3xl">LOGGIN IN!</p>
      </div>
    );
  } else {
    return (
      <>
        <Head>
          <title>Twitter</title>
        </Head>
        <div className="h-screen w-screen bg-black flex flex-row overflow-y-hidden">
          <AuthPrompt style={loginState !== null ? "absolute left-0 right-0 top-0 bottom-0 text-center" : "hidden"}/>
          <SideBar />
          <TweetFeed />
          <div className="hidden flex-1 md:flex justify-center pt-5">
            <button
              placeholder="SignIn"
              className="w-1/2 max-h-10 rounded-2xl border-2 border-textWhiteH text-textWhite"
              onClick={loginUserHandler}
            >
              {loginState === null ? "Sign In" : "Sign Out"}
            </button>
          </div>
        </div>
      </>
    );
  }
};

export default Home;
