import {
  HomeIcon,
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  UserIcon,
} from "@heroicons/react/outline";
import { DesktopComputerIcon } from "@heroicons/react/outline";
import Link from "next/link";
import NavComponent from "./NavComponent";
import TweetButton from "../Feed/TweetButton";
import { IsDarkMode } from "../../utils/IsDarkMode";
import { ThemeType } from "../../pages";

interface Props {
  userDetails: any;
  containerStyle: string | undefined;
  isMobile: boolean;
  openTweetBox: () => void;
  theme: ThemeType;
}

const SideBar = ({
  userDetails,
  containerStyle,
  isMobile,
  openTweetBox,
  theme,
}: Props) => {
  return (
    <div
      className={
        !containerStyle
          ? "hidden sm:hidden md:w-[28%] lg:w-[20%] xl:1/4 h-full border-r-2 border-gray100 font-mono md:flex md:flex-col"
          : containerStyle
      }
    >
      <div className="w-full h-[17%]">
        {(() => {
          if (isMobile) {
            return (
              <div className="flex justify-around items-center h-full text-textWhiteH none sm:text-xl md:text-2xld">
                <div className="w-10 h-10 md:w-12 md:h-12">
                  <DesktopComputerIcon />
                </div>
                <p>DeVeLoPeR</p>
              </div>
            );
          } else {
            return (
              <Link href={"/"}>
                <div className={theme === "dark" ? "h-full w-full flex flex-row justify-evenly items-center text-textWhiteH" : "h-full w-full flex flex-row justify-evenly items-center text-black"}>
                  <div className="w-10 h-10 md:w-12 md:h-12">
                    <DesktopComputerIcon />
                  </div>
                  <div className="bg-twitterBlue p-3 blur-md w-24 h-6 md:w-28 lg:w-44 lg:h-10"></div>
                  <div className="absolute left-16 md:left-28 lg:left-24">
                    <p className="none sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold">
                      DeVeLoPeR
                    </p>
                  </div>
                </div>
              </Link>
            );
          }
        })()}
      </div>
      <div className="w-full h-[65%] flex flex-col justify-evenly items-center">
        <div className="w-full h-[75%] flex flex-col item-start justify-around">
          <Link href={"/"}>
            <a className="mb-2">
              <NavComponent theme={theme} Component={HomeIcon} text="Home" />
            </a>
          </Link>
          <Link href={"/"}>
            <a>
              <NavComponent theme={theme} Component={HashtagIcon} text="Hashtags" />
            </a>
          </Link>
          <Link href={"/"}>
            <a>
              <NavComponent theme={theme} Component={BellIcon} text="Alerts" />
            </a>
          </Link>
          <Link href={"/"}>
            <a>
              <NavComponent theme={theme} Component={InboxIcon} text="Messages" />
            </a>
          </Link>
          <Link href={"/"}>
            <a>
              <NavComponent theme={theme} Component={BookmarkIcon} text="Bookmarks" />
            </a>
          </Link>
          <Link href={"/profile/" + userDetails?.id}>
            <a>
              <NavComponent theme={theme} Component={UserIcon} text="Profile" />
            </a>
          </Link>
        </div>
        <div
          onClick={() => {
            openTweetBox();
          }}
          className="h-[13%] w-[65%] mt-5 rounded-full overflow-hidden"
        >
          <TweetButton styles="w-full h-full text-black bg-twitterBlue text-center" />
        </div>
      </div>
      <div className="w-full h-[18%] flex flex-row justify-evenly items-center">
        <img
          src="https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg"
          alt=""
          className="rounded-full hidden md:flex md:h-[40%]"
        />
        <div className="flex flex-col justify-evenly items-start">
          <p className={IsDarkMode(theme) ? "text-textWhiteH text-sm lg:text-lg font-bold" : "text-black text-sm lg:text-lg font-bold"}>
            @{userDetails?.username || ""}
          </p>
          <p className={IsDarkMode(theme) ? "text-textWhiteH text-sm lg:text-md" : "text-black text-sm lg:text-md"}>
            {userDetails?.name || ""}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
