import { ChevronDownIcon } from "@heroicons/react/outline";
import React from "react";
import { ThemeType } from "../../pages";
import { IsDarkMode } from "../../utils/IsDarkMode";
import Feed from "../Feed/Feed";
import { Data, Tweet } from "../Feed/TweetFeed";

interface Props {
  idx: number;
  tweet: Tweet;
  data: Data;
  setIsReplyActive: (val: boolean) => void;
  isReplyActive: boolean;
  theme: ThemeType;
}

const Tweet = ({
  data,
  idx,
  isReplyActive,
  setIsReplyActive,
  tweet,
  theme,
}: Props) => {
  return (
    <div
      className={
        IsDarkMode(theme)
          ? "flex flex-col items-center"
          : "flex flex-col items-center bg-textWhiteH"
      }
      key={idx}
    >
      <Feed
        style={undefined}
        key={tweet.id}
        tweet={tweet}
        replyCount={undefined}
        theme={theme}
      />
      <div
        className={
          "w-[95%] h-fit -mt-5 mb-4 flex flex-col justify-between border-b-2 border-b-accentGray pb-2"
        }
      >
        {(() => {
          if (data?.getAllTweets[idx]?.replies?.length !== 0) {
            return (
              <div className="flex space-x-4 cursor-pointer w-fit h-fit">
                <p
                  onClick={() => {
                    setIsReplyActive(!isReplyActive);
                  }}
                  className={
                    IsDarkMode(theme)
                      ? "text-textWhiteH text-2xl font-medium mb-4 ml-2"
                      : "text-black text-2xl font-medium mb-4 ml-2"
                  }
                >
                  Replies
                </p>
                <ChevronDownIcon
                  onClick={() => {
                    setIsReplyActive(!isReplyActive);
                  }}
                  className="w-8 h-8 text-twitterBlue cursor-pointer"
                />
              </div>
            );
          }
        })()}
        <div className="">
          {isReplyActive
            ? data?.getAllTweets[idx].replies?.map((tweetX, index: number) => {
                if (index > 2) return null;
                return (
                  <div
                    key={index}
                    className={
                      IsDarkMode(theme)
                        ? "flex flex-col md:px-8  md:min-w-[300px] w-fit px-10 items-start justify-between text-textWhiteH mx-4 mb-4 py-2 border-2 border-twitterBlue rounded-xl"
                        : "flex flex-col md:px-8  md:min-w-[300px] w-fit px-10 items-start justify-between text-black mx-4 mb-4 py-2 border-2 border-twitterBlue rounded-xl bg-textWhiteH"
                    }
                  >
                    <p className="text-md font-medium text-accentGray">
                      Replied By {tweetX.repliedUsername}
                    </p>
                    <p className="text-xl font-medium">{tweetX.description}</p>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default Tweet;
