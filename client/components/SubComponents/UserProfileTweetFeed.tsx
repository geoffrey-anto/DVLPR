import { ChevronDownIcon } from "@heroicons/react/outline";
import React from "react";
import NoTweets from "../ErrorComponents/NoTweets";
import Feed from "../Feed/Feed";

// Props
interface Props {
  data: any;
  setIsReplyActive: (value: boolean) => void;
  isReplyActive: boolean;
  isVisible: boolean;
}

const UserProfileTweetFeed = ({
  data,
  isReplyActive,
  setIsReplyActive,
  isVisible,
}: Props) => {
  return (
    <div className="overflow-y-scroll w-full h-[80%] scrollbar-hide bg-black">
      {(() => {
        if (!isVisible) {
          return <NoTweets />;
        } else {
          return data?.getTweetsForUser?.map((tweet: any, idx: number) => {
            return (
              <div className="flex flex-col items-center" key={idx}>
                <Feed
                  key={tweet?.id}
                  style="bg-black w-full h-fit scrollbar-hide p-4 flex flex-col items-center"
                  tweet={tweet}
                  replyCount={data?.getTweetsForUser[idx]?.replies?.length}
                />
                <div className="w-[95%] h-fit -mt-2 mb-4 flex flex-col justify-between border-b-2 border-b-accentGray pb-2">
                  {(() => {
                    if (data?.getTweetsForUser[idx]?.replies?.length !== 0) {
                      return (
                        <div className="flex space-x-4">
                          <p className="text-textWhiteH text-2xl font-medium mb-4 ml-2">
                            Replies
                          </p>
                          <ChevronDownIcon
                            onClick={() => {
                              setIsReplyActive(!isReplyActive);
                            }}
                            className="w-8 h-8 text-twitterBlue"
                          />
                        </div>
                      );
                    }
                  })()}
                  <div className="">
                    {isReplyActive
                      ? data?.getTweetsForUser[idx]?.replies?.map(
                          (tweetX: any, index: number) => {
                            if (index > 2) return null;
                            return (
                              <div
                                key={index}
                                className="flex flex-col md:px-8 md:min-w-[300px] w-fit px-10 items-start justify-between text-textWhiteH mx-4 mb-4 py-2 border-2 border-twitterBlue rounded-xl"
                              >
                                <p className="text-md font-medium transform text-accentGray">
                                  Replied By {tweetX?.repliedUsername}
                                </p>
                                <p className="text-xl font-medium">
                                  {tweetX?.description}
                                </p>
                              </div>
                            );
                          }
                        )
                      : null}
                  </div>
                </div>
              </div>
            );
          });
        }
      })()}
    </div>
  );
};

export default UserProfileTweetFeed;
