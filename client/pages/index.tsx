import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import LoginAuthPrompt from "../components/LoginAuthPrompt";
import RegisterAuthPrompt from "../components/RegisterAuthPrompt";
import SideBar from "../components/SideBar";
import TweetFeed from "../components/TweetFeed";
import TrendingList from "../components/TrendingList";

export type authStatusType = "registered" | "logged" | null;

const Home: NextPage = () => {
  const [loginState, setLoginState] = useState<authStatusType>(null);
  const [userData, setUserData] = useState<any | undefined>(undefined);
  const [pageStatus, setPageStatus] = useState<"loading" | "loaded">("loading");
  const [sideBarState, setSideBarState] = useState<boolean>(false);

  const cb = (isAuthenticated: authStatusType, data: any | undefined) => {
    if (isAuthenticated === null) {
      setLoginState(null);
    } else if (isAuthenticated === "registered") {
      setLoginState("registered");
    } else if (isAuthenticated === "logged") {
      setLoginState(isAuthenticated);
      setUserData(data);
    } else {
      console.log("Please Login Or Register");
    }
  };
  useEffect(() => {
    setPageStatus("loaded");
    if (localStorage.getItem("authId") !== null) {
      if (
        (new Date().getTime() -
          parseInt(localStorage.getItem("authTime") as string)) /
          (1000 * 60) >
        15.0
      ) {
        setLoginState(null);
        localStorage.removeItem("authId");
        localStorage.removeItem("authUserName");
        localStorage.removeItem("authName");
        localStorage.removeItem("authTime");
        return;
      }
      cb("logged", {
        name: localStorage.getItem("authName"),
        username: localStorage.getItem("authUserName"),
        id: localStorage.getItem("authId"),
      });
    }
  }, []);
  if (pageStatus === "loading") {
    return <div className="w-screen h-screen bg-black"></div>;
  } else
    return (
      <>
        <Head>
          <title>Twitter</title>
        </Head>
        <div className="p-0 m-0 h-screen w-screen bg-black flex flex-row overflow-y-hidden">
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

          <SideBar isMobile={false} containerStyle={undefined} userDetails={userData} />
          {(() => {
            if (!sideBarState) {
              return null;
            } else {
              return (
                <div className="absolute w-[50%] sm:w-[40%] h-full bg-black z-50 md:hidden">
                  <SideBar isMobile={true} containerStyle={"flex flex-col md:hidden h-full border-r-2 border-gray100 font-mono"} userDetails={userData} />
                </div>
              );
            }
          })()}
          <TweetFeed
            openDrawer={(val: boolean) => {
              if (val) {
                setSideBarState(!sideBarState);
              }
            }}
          />
          <div className="hidden md:flex-col md:flex-1 md:flex justify-between pt-5">
            <div className="w-[100%] h-[10%] flex items-center justify-center">
            <button
              placeholder="SignIn"
              className="w-48 h-12 rounded-2xl border-2 border-textWhiteH text-textWhite"
              onClick={() => {
                setLoginState("registered");
                localStorage.removeItem("authId");
                localStorage.removeItem("authUserName");
                localStorage.removeItem("authName");
              }}
            >
              {loginState === null ? "Sign In" : "Sign Out"}
            </button>
            </div>
            <div className="w-full h-[90%]">
              <TrendingList />
            </div>
          </div>
        </div>
      </>
    );
};

export default Home;
