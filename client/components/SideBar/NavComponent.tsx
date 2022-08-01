import React from "react";
import { ThemeType } from "../../pages";
import { IsDarkMode } from "../../utils/IsDarkMode";

interface Props {
  Component: (props: React.ComponentProps<"svg">) => JSX.Element;
  text: string;
  theme: ThemeType;
}

function NavComponent({ Component, text, theme }: Props) {
  return (
    <div className={IsDarkMode(theme) ? "h-full w-full flex flex-row  justify-start items-center space-x-5 pl-8 text-textWhiteH" : "h-full w-full flex flex-row  justify-start items-center space-x-5 pl-8 text-black"}>
      <div className="w-6 h-6 md:w-8 md:h-8 cursor-pointer">
        <Component />
      </div>
      <p className="none sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-3xl font-bold cursor-pointer">
        {text}
      </p>
    </div>
  );
}

export default NavComponent;
