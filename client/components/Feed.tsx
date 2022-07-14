import {
  DotsHorizontalIcon,
  HeartIcon,
  RefreshIcon,
  ReplyIcon,
  ShareIcon,
} from "@heroicons/react/outline";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tweet } from "./TweetFeed";
// import "../public/./color.css"
// import color.css

function Feed({ tweet }: { tweet: Tweet }) {
  return (
    <div className="w-full h-fit scrollbar-hide p-4 flex flex-col items-center">
      <div className="w-full h-auto flex flex-row items-center justify-between px-4 font-mono">
        {/* // Profile/Name */}
        <div className="text-textWhiteH w-fit flex flex-row items-center justify-start gap-4">
          <img
            className="h-14 w-14 rounded-full"
            src="https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg"
          />
          <div className="flex flex-col font-semibold">
            <p>{tweet.user?.name}</p>
            <p>@{tweet.user?.username}</p>
          </div>
        </div>

        {/* // MoreOptions */}
        <div className="h-8 w-8 text-textWhiteH">
          <DotsHorizontalIcon />
        </div>
      </div>
      <div className="text-textWhiteH flex flex-col p-6 text-lg lg:text-xl font-light lg:font-light font-sans">
        <p>
          {tweet.description}
        </p>
      </div>
      <img
        className="h-[55%]"
        src={tweet.image}
        alt=""
      />
      <div className="w-full mt-2 border-b-2 border-b-gray100">
        <p className="text-accentGray my-4">
          10:28 AM · Jul 13, 2022 · Twitter Web App
        </p>
      </div>
      <div className="w-full text-textWhite py-4 border-b-2 border-b-gray100">
        <div className="w-[70%] md:w-[80%] lg:w-[60%] flex items-center justify-around">
          <p>329 Retweets</p>
          <p>5 Quote Tweets</p>
          <p>8,613 Likes</p>
        </div>
      </div>
      <div className="w-full h-fit mt-4 pb-4 px-8 text-textWhite border-b-2 border-b-gray100">
        <div className="flex flex-row items-center justify-between">
          <div className="h-6 w-6 cursor-pointer">
            <ReplyIcon />
          </div>
          <div className="h-6 w-6 cursor-pointer">
            <RefreshIcon />
          </div>
          <div className="h-6 w-6 cursor-pointer">
            <HeartIcon />
          </div>
          <div className="h-6 w-6 cursor-pointer">
            <ShareIcon />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feed;
