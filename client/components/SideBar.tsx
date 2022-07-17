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
import TweetButton from "./TweetButton";

interface Props {
  userDetails: any;
  containerStyle: string | undefined;
  isMobile: boolean;
}

const SideBar = ({ userDetails, containerStyle, isMobile }: Props) => {
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
                <div className="h-full w-full flex flex-row justify-evenly items-center text-textWhiteH">
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
        <div className="w-full h-[75%] flex flex-col">
          <Link href={"/"}>
            <a className="mb-2">
              <NavComponent Component={HomeIcon} text="Home" />
            </a>
          </Link>
          <NavComponent Component={HashtagIcon} text="Hashtags" />
          <NavComponent Component={BellIcon} text="Alerts" />
          <NavComponent Component={InboxIcon} text="Messages" />
          <NavComponent Component={BookmarkIcon} text="Bookmarks" />
          <Link href={"/profile/" + userDetails?.id}>
            <a className="mt-2">
              <NavComponent Component={UserIcon} text="Profile" />
            </a>
          </Link>
        </div>
        <TweetButton styles="text-black bg-twitterBlue h-[13%] w-[65%] text-center rounded-full mt-5" />
      </div>
      <div className="w-full h-[18%] flex flex-row justify-evenly items-center">
        <img
          src="https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg"
          alt=""
          className="rounded-full hidden md:flex md:h-[40%]"
        />
        <div className="flex flex-col justify-evenly items-start">
          <p className="text-textWhiteH text-sm lg:text-lg font-bold">
            @{userDetails?.username || ""}
          </p>
          <p className="text-textWhiteH text-sm lg:text-md">
            {userDetails?.name || ""}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
