import { Jelly } from "@uiball/loaders";
import { ThemeType } from "../../pages";
import { IsDarkMode } from "../../utils/IsDarkMode";

const Loading = ({theme}: {theme: ThemeType}) => {
    return (
        <div className={IsDarkMode(theme) ? "w-full h-screen flex items-center justify-center bg-black" : "w-full h-screen flex items-center justify-center bg-textWhiteH"}>
          <Jelly color={"#1D9BF0"} size={50} />
        </div>
      );
}

export default Loading