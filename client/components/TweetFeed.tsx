import { ApolloError, useQuery } from "@apollo/client";
import { ArrowUpIcon, ChevronDownIcon } from "@heroicons/react/outline";
import { Jelly } from "@uiball/loaders";
import { useEffect, useState } from "react";
import { GET_ALL_TWEETS } from "../graphql/Query";
import Feed from "./Feed";
import TweetBox from "./TweetBox";

interface User {
  id: number;
  name: string;
  username: string;
}

export interface Tweet {
  description: string;
  id: number;
  image: string;
  likes: number;
  isRepost: boolean;
  repostCount: number | null;
  user: null | User;
  createdAt: string;
  likesIds: number[];
  replies: {
    id: number;
    description: string;
    repliedUsername: string;
  }[];
}
interface Data {
  getAllTweets: Tweet[];
}

function TweetFeed({ openDrawer, isOpen }: { openDrawer: (val: boolean) => void, isOpen: boolean }) {
  const {
    loading,
    error,
    data: resp,
  }: {
    error?: ApolloError | undefined;
    loading?: boolean;
    data?: Data;
  } = useQuery(GET_ALL_TWEETS);

  const [data, setData] = useState<Data>();

  useEffect(() => {
    setData(resp);
  }, [resp]);

  const [visible, setVisible] = useState(true);

  const [isReplyActive, setIsReplyActive] = useState(false);

  const scrollToTop = () => {
    document.getElementById("scrl")?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleVisible = () => {
    setVisible(true);
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
  }, [])

  return (
    <div className="bg-black w-full md:w-[50%] lg:w-[55%] xl:w-[58%] border border-r-gray100 overflow-x-scroll scrollbar-hide h-auto">
      {isOpen ? <div className="flex md:sticky top-6 px-8">
        <TweetBox openDrawer={openDrawer} />
      </div> : null}
      <div
        className={
          visible
            ? "absolute bottom-12 left-[65%] bg-black text-textWhiteH cursor-pointer w-14 h-14 rounded-lg border-4 border-textWhite"
            : "hidden"
        }
      >
        <ArrowUpIcon onClick={scrollToTop} />
      </div>
      <div id="scrl">
        {(() => {
          if (loading) {
            return (
              <div className="text-textWhiteH absolute top-[70%] ml-auto right-1/2 text-2xl">
                <Jelly color={"#1D9BF0"} size={50}/>
              </div>
            );
          } else if (error) {
            return <div className="text-textWhiteH">Error</div>;
          } else {
            return (
              <div className="mt-10">
                {data?.getAllTweets?.map((tweet, idx) => {
                  return (
                    <div className="flex flex-col items-center" key={idx}>
                      <Feed style={undefined} key={tweet.id} tweet={tweet} replyCount={undefined}/>;
                      <div className="w-[95%] h-fit -mt-10 mb-4 flex flex-col justify-between border-b-2 border-b-accentGray pb-2">
                        {(() => {
                          if (data?.getAllTweets[idx]?.replies?.length !== 0) {
                            return (
                              <div className="flex space-x-4">
                                <p className="text-textWhiteH text-2xl font-medium mb-4 ml-2">
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
                            ? data?.getAllTweets[idx].replies?.map(
                                (tweetX, index: number) => {
                                  if (index > 2) return null;
                                  return (
                                    <div
                                      key={index}
                                      className="flex flex-col md:px-8  md:min-w-[300px] w-fit px-10 items-start justify-between text-textWhiteH mx-4 mb-4 py-2 border-2 border-twitterBlue rounded-xl"
                                    >
                                      <p className="text-md font-medium text-accentGray">
                                        Replied By {tweetX.repliedUsername}
                                      </p>
                                      <p className="text-xl font-medium">
                                        {tweetX.description}
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
                })}
              </div>
            );
          }
        })()}
      </div>
    </div>
  );
}

export default TweetFeed;
