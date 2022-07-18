import { useQuery } from "@apollo/client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { GET_TOP_TWEETS, GET_TOP_USERS } from "../graphql/Query";

const TrendintList = () => {
  const [maxRows, setMaxRows] = useState(4);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if(window.screen.height > 620) {
        setMaxRows(4);
      } else if(window.screen.height > 480) {
        setMaxRows(3);
      } else {
        setMaxRows(2);
      }
    })
  } ,[])

  const { data: topUserData } = useQuery(GET_TOP_USERS, {
    variables: {
      limit: 5,
    },
  });
  const { data: topTweetData } = useQuery(GET_TOP_TWEETS, {
    variables: {
      limit: 5,
    },
  });

  return (
    <div className="w-full h-full text-textWhiteH">
      {/* Trending Users */}
      <div className="w-full h-1/2 overflow-visible pt-2 flex flex-col mb-2">
        <p className="w-full text-center mb-4 font-bold text-2xl text-">
          Top Users
        </p>

        {topUserData &&
          topUserData.getTopUsers &&
          (topUserData.getTopUsers as Array<any>)
            ?.slice(0, maxRows)
            .map((user: any) => {
              return (
                <div
                  key={user.id}
                  className="flex flex-row items-center justify-around px-4 pb-4"
                >
                  <Link href={`/profile/${user.id}`}>
                    <div className="hover:border-2 hover:border-twitterBlue rounded-lg flex items-center justify-around w-full cursor-pointer">
                      <img
                        src="https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg"
                        alt=""
                        className="rounded-full hidden md:flex md:h-10"
                      />
                      <div className="flex flex-col items-start justify-center w-1/2">
                        <p>{user.name}</p>
                        <p className="text-accentGray">@{user.username}</p>
                      </div>
                      <div className="flex text-textWhite">
                        {/* <p>{user.tweets?.length}</p> */}
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
      </div>

      {/* Trending Tweets */}
      <div className="w-full h-1/2 overflow-visible pt-2 flex flex-col">
        <p className="w-full text-center mb-4 font-bold text-2xl">Top Tweets</p>
        {topTweetData &&
          topTweetData.getTopTweets &&
          (topTweetData.getTopTweets as Array<any>)
            .slice(0, maxRows)
            .map((tweet: any) => {
              return (
                <div
                  key={tweet.id}
                  className="flex flex-row items-center justify-around px-4 pb-4"
                >
                  <Link href={`/tweet/${tweet.id}`}>
                    <div className="hover:border-2 hover:border-twitterBlue rounded-lg flex items-center justify-around w-full cursor-pointer">
                      <img
                        src={
                          tweet.image
                            ? tweet.image
                            : "https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg"
                        }
                        alt=""
                        className="rounded-full hidden md:flex md:h-10"
                      />
                      <div className="flex flex-col items-start justify-center w-40">
                        <p className="w-full">
                          {(tweet.description as string).substring(0, 22)}
                        </p>
                        <p className="text-accentGray">{tweet.user?.name}</p>
                      </div>
                      <div className="flex text-textWhite">
                        {/* <p>{tweet.likes}</p> */}
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default TrendintList;
