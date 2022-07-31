import {
  ApolloError,
  ApolloQueryResult,
  OperationVariables,
  useQuery,
} from "@apollo/client";
import { ArrowUpIcon, ChevronDownIcon } from "@heroicons/react/outline";
import { Jelly } from "@uiball/loaders";
import { useEffect, useState } from "react";
import { GET_ALL_TWEETS } from "../../graphql/Query";
import Error from "../ErrorComponents/Error";
import Loading from "../LoadingComponents/Loading";
import Tweet from "../SubComponents/Tweet";
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
export interface Data {
  getAllTweets: Tweet[];
}

function TweetFeed({
  openDrawer,
  isOpen,
}: {
  openDrawer: (val: boolean) => void;
  isOpen: boolean;
}) {
  const {
    loading,
    error,
    data: resp,
    refetch,
  }: {
    error?: ApolloError | undefined;
    loading?: boolean;
    data?: Data;
    refetch: (
      variables?: Partial<OperationVariables> | undefined
    ) => Promise<ApolloQueryResult<any>>;
  } = useQuery(GET_ALL_TWEETS, {
    variables: {
      limit: 10,
    },
  });

  const [data, setData] = useState<Data>();

  const [currentTweetsSize, setCurrentTweetsSize] = useState(10);

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
  }, []);

  const refetchMoreTweet = () => {
    refetch({
      limit: currentTweetsSize + 10,
    });
    setCurrentTweetsSize(currentTweetsSize + 10);
  };

  return (
    <div className="bg-black w-full md:w-[50%] lg:w-[55%] xl:w-[58%] border border-r-gray100 overflow-y-scroll scrollbar-thin scrollbar-thumb-twitterBlue scrollbar-track-black h-auto">
      {isOpen ? (
        <div className="flex md:sticky top-6 px-8">
          <TweetBox openDrawer={openDrawer} />
        </div>
      ) : null}
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
                <Jelly color={"#1D9BF0"} size={50} />
              </div>
            );
          } else if (error) {
            return (
              <div className="w-full h-screen">
                <Error />;
              </div>
            );
          } else {
            return (
              <div>
                <div className="mt-10">
                  {data?.getAllTweets?.map((tweet, idx) => {
                    return (
                      <Tweet
                        data={data}
                        idx={idx}
                        key={tweet.id}
                        tweet={tweet}
                        isReplyActive={isReplyActive}
                        setIsReplyActive={setIsReplyActive}
                      />
                    );
                  })}
                </div>
                {loading ? (
                  <Loading />
                ) : (
                  <div className="flex items-center justify-center w-full h-20">
                    <div
                      onClick={refetchMoreTweet}
                      className="flex items-center justify-center cursor-pointer text-textWhiteH hover:text-twitterBlue "
                    >
                      <p className="text-xl">Load More&nbsp;&nbsp;</p>
                      <div className="mt-1 w-8 h-8">
                        <ChevronDownIcon />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          }
        })()}
      </div>
    </div>
  );
}

export default TweetFeed;
