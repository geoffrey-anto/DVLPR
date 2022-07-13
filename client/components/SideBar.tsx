import {
  HomeIcon,
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  UserIcon,
} from "@heroicons/react/outline";
import { DesktopComputerIcon } from "@heroicons/react/outline";
import NavComponent from "./NavComponent";
import TweetButton from "./TweetButton";

const SideBar = () => {
  return (
    <div className="hidden sm:w-[29%] md:w-[28%] lg:w-[20%] xl:1/4 h-full border-r-2 border-gray100 font-mono sm:flex sm:flex-col">
      <div className="w-full h-[17%]">
        <div className="h-full w-full flex flex-row justify-evenly items-center text-textWhiteH">
          <div className="w-10 h-10 md:w-12 md:h-12">
            <DesktopComputerIcon />
          </div>
          <p className="none sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold sm:shadow-sm sm:shadow-twitterBlue">
            DeVeLoPeR
          </p>
        </div>
      </div>
      <div className="w-full h-[65%] flex flex-col justify-evenly items-center">
        <div className="w-full h-[75%] flex flex-col">
          <NavComponent Component={HomeIcon} text="Home" />
          <NavComponent Component={HashtagIcon} text="Hashtags" />
          <NavComponent Component={BellIcon} text="Alerts" />
          <NavComponent Component={InboxIcon} text="Messages" />
          <NavComponent Component={BookmarkIcon} text="Bookmarks" />
          <NavComponent Component={UserIcon} text="Profile" />
        </div>
        <TweetButton styles="text-black bg-twitterBlue h-[13%] w-[65%] text-center rounded-full mt-5"/>
      </div>
      <div className="w-full h-[18%] flex flex-row justify-evenly items-center">
        <img
          src="https://img.freepik.com/free-photo/close-up-young-successful-man-smiling-camera-standing-casual-outfit-against-blue-background_1258-66609.jpg?w=2000"
          alt=""
          className="rounded-full h-[40%]"
        />
        <div className="flex flex-col justify-evenly items-start">
          <p className="text-textWhiteH">Name</p>
          <p className="text-textWhiteH">Username</p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
