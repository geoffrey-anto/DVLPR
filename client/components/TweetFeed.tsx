import { ApolloError, useQuery } from "@apollo/client";
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
  user: null | User;
}
interface Data {
  getAllTweets: Tweet[];
};

function TweetFeed() {
  const {
    loading,
    error,
    data: resp,
  }: { error?: ApolloError | undefined; loading?: boolean; data?: Data } =
    useQuery(GET_ALL_TWEETS);

    const [data, setData] = useState<Data>();

    useEffect(() => {
      console.log("!");
      setData(resp);
    }, [resp]);
  return (
    <div className="bg-black w-full md:w-[50%] lg:w-[55%] xl:w-[58%] border border-r-gray100 overflow-x-scroll scrollbar-hide">
      <div className="sticky top-0">
        <TweetBox />
      </div>
      {(() => {
        if (loading) {
          return <div className="text-textWhiteH flex items-center justify-center h-full text-2xl">...</div>;
        } else if (error) {
          return <div className="text-textWhiteH">Error</div>;
        } else {
          return <div>{data?.getAllTweets?.map((tweet) => {
            return <Feed key={tweet.id} tweet={tweet} />;
          })}</div>;
        }
      })()}
    </div>
  );
}

export default TweetFeed;
