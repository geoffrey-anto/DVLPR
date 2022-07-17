import { ApolloError, useQuery } from "@apollo/client";
import { ArrowUpIcon } from "@heroicons/react/outline";
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
}
interface Data {
  getAllTweets: Tweet[];
}

function TweetFeed({ openDrawer }: { openDrawer: (val: boolean) => void }) {
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

  const scrollToTop = () => {
    document.getElementById('scrl')?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleVisible = () => {
    setVisible(true);
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <div className="bg-black w-full md:w-[50%] lg:w-[55%] xl:w-[58%] border border-r-gray100 overflow-x-scroll scrollbar-hide h-auto">
      <div className="flex md:sticky top-6 px-8">
        <TweetBox openDrawer={openDrawer} />
      </div>
      <div className={
            visible
              ? "absolute bottom-12 left-[65%] bg-black text-textWhiteH cursor-pointer w-14 h-14 rounded-lg border-4 border-textWhite"
              : "hidden"
          }>
        <ArrowUpIcon
          onClick={scrollToTop}
          
        />
      </div>
      <div id="scrl">
      {(() => {
        if (loading) {
          return (
            <div className="text-textWhiteH flex items-center justify-center h-full text-2xl">
              ...
            </div>
          );
        } else if (error) {
          return <div className="text-textWhiteH">Error</div>;
        } else {
          return (
            <div  className="mt-10">
              {data?.getAllTweets?.map((tweet) => {
                return <Feed style={undefined} key={tweet.id} tweet={tweet} />;
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
