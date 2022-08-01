import { SunIcon } from "@heroicons/react/outline";
import React from "react";
import { ThemeType } from "../../pages";
import { IsDarkMode } from "../../utils/IsDarkMode";
import TrendingList from "./TrendingList";

interface Props {
  signOut: () => void;
  theme: ThemeType;
  toggleTheme: () => void;
}

const LeftPane = ({ signOut, theme, toggleTheme }: Props) => {
  return (
    <div className="hidden md:flex-col md:flex-1 md:flex justify-between pt-5">
      <div className="w-[100%] h-[10%] flex items-center justify-evenly">
        <button
          placeholder="SignIn"
          className={IsDarkMode(theme) ? "w-48 h-12 rounded-2xl border-2 border-textWhiteH text-textWhite" : "w-48 h-12 rounded-2xl border-2 border-black text-black"}
          onClick={() => {
            signOut();
          }}
        >
          {"Sign Out"}
        </button>
        <SunIcon onClick={toggleTheme} className={IsDarkMode(theme) ? "w-8 h-8 text-textWhiteH" : "w-8 h-8 text-black"}/>
      </div>
      <div className="w-full h-[90%]">
        <TrendingList theme={theme}/>
      </div>
    </div>
  );
};

export default LeftPane;
