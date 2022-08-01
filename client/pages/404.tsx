import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ThemeType } from ".";
import { IsDarkMode } from "../utils/IsDarkMode";

const Home = () => {
  const [theme, setTheme] = useState<ThemeType>("dark");
  useEffect(() => {
    const theme_ = localStorage.getItem("theme");
    if (theme_) {
      setTheme(theme_ as ThemeType);
    }
  });
  return (
    <div
      className={
        IsDarkMode(theme)
          ? "flex w-screen h-screen flex-1 items-center justify-center bg-black text-textWhiteH"
          : "flex w-screen h-screen flex-1 items-center justify-center bg-textWhiteH text-black"
      }
    >
      <Link href={"/"}>
        <p className={"text-2xl underline cursor-pointer hover:text-twitterBlue"}>
          Wrong Page! Click Below To Redirect To Home Page
        </p>
      </Link>
    </div>
  );
};

export default Home;
