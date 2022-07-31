import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import LoginAuthPrompt from "../components/AuthComponents/LoginAuthPrompt";
import RegisterAuthPrompt from "../components/AuthComponents/RegisterAuthPrompt";
import SideBar from "../components/SideBar/SideBar";
import TweetFeed from "../components/Feed/TweetFeed";
import TrendingList from "../components/LeftPane/TrendingList";
import { SunIcon } from "@heroicons/react/outline";

export type authStatusType = "registered" | "logged" | null;
export type themeType = "light" | "dark";

const Home: NextPage = () => {
  const [loginState, setLoginState] = useState<authStatusType>(null);
  const [userData, setUserData] = useState<any | undefined>(undefined);
  const [pageStatus, setPageStatus] = useState<"loading" | "loaded">("loading");
  const [sideBarState, setSideBarState] = useState<boolean>(false);
  const [isTweetBoxActive, setIsTweetBoxActive] = useState<boolean>(true);
  const [theme, setTheme] = useState<themeType>("dark");

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }

  const toggleTweetBox = () => {
    setIsTweetBoxActive(!isTweetBoxActive);
  };

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

  // useLayoutEffect(() => {
  //   console.log("!");
  //   document.addEventListener("keypress", (e) => {
  //     if (e.key === "Escape") {
  //       setSideBarState(false);
  //     }
  //   });
  // }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (window.screen.width > 768) {
      setIsTweetBoxActive(false);
    } else {
      setIsTweetBoxActive(true);
    }
    window.addEventListener("resize", () => {
      if (window.screen.availWidth < 768) {
        setIsTweetBoxActive(true);
      }
    });
    setPageStatus("loaded");
    if (localStorage.getItem("authId") !== null) {
      if (
        (new Date().getTime() -
          parseInt(localStorage.getItem("authTime") as string)) /
          (1000 * 60 * 60 * 24) >
        1.0
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
          <title>Dvlpr</title>
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

          <SideBar
            isMobile={false}
            containerStyle={undefined}
            userDetails={userData}
            openTweetBox={toggleTweetBox}
          />
          {(() => {
            if (!sideBarState) {
              return null;
            } else {
              return (
                <div className="absolute w-[50%] sm:w-[40%] h-full bg-black z-50 md:hidden">
                  <SideBar
                    isMobile={true}
                    containerStyle={
                      "flex flex-col md:hidden h-full border-r-2 border-gray100 font-mono"
                    }
                    userDetails={userData}
                    openTweetBox={toggleTweetBox}
                  />
                </div>
              );
            }
          })()}
          <TweetFeed
            isOpen={isTweetBoxActive}
            openDrawer={(val: boolean) => {
              if (val) {
                setSideBarState(!sideBarState);
              }
            }}
          />
          <div className="hidden md:flex-col md:flex-1 md:flex justify-between pt-5">
            <div className="w-[100%] h-[10%] flex items-center justify-evenly">
              <button
                placeholder="SignIn"
                className="w-48 h-12 rounded-2xl border-2 border-textWhiteH text-textWhite"
                onClick={() => {
                  setLoginState("registered");
                  localStorage.removeItem("authId");
                  localStorage.removeItem("authUserName");
                  localStorage.removeItem("authName");
                  localStorage.removeItem("authTime");
                }}
              >
                {loginState === null ? "Sign In" : "Sign Out"}
              </button>
              <SunIcon onClick={toggleTheme} className="w-8 h-8 text-textWhiteH" />
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
