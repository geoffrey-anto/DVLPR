import { useQuery } from "@apollo/client";
import { Jelly } from "@uiball/loaders";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { GET_TOP_TWEETS, GET_TOP_USERS } from "../../graphql/Query";

const TrendingList = () => {
  const [maxRows, setMaxRows] = useState(7);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.screen.height > 620) {
        setMaxRows(7);
      } else if (window.screen.height > 480) {
        setMaxRows(5);
      } else {
        setMaxRows(3);
      }
    });
  }, []);

  const { data: topUserData } = useQuery(GET_TOP_USERS, {
    variables: {
      limit: 7,
    },
  });
  const { data: topTweetData, loading } = useQuery(GET_TOP_TWEETS, {
    variables: {
      limit: 7,
    },
  });

  return (
    <div className="w-full h-full text-textWhiteH">
      {/* Trending Users */}
      <div className="w-full h-1/2 overflow-visible pt-2 flex flex-col mb-2">
        <p className="w-full text-center mb-4 font-bold text-2xl text-">
          Top Users
        </p>
        <div className="overflow-y-scroll scrollbar-thin scrollbar-thumb-twitterBlue">
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
      </div>

      {/* Trending Tweets */}
      {(() => {
        if (loading) {
          return (
            <div className="text-textWhiteH h-1/2 flex items-center justify-center text-2xl">
              <Jelly color={"#1D9BF0"} size={50} />
            </div>
          );
        } else {
          return (
            <div className="w-full h-1/2 overflow-visible pt-2 flex flex-col">
              <p className="w-full text-center mb-4 font-bold text-2xl">
                Top Tweets
              </p>
              <div className="overflow-y-scroll scrollbar-thin scrollbar-thumb-twitterBlue">
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
                                  {(tweet.description as string).substring(
                                    0,
                                    22
                                  )}
                                </p>
                                <p className="text-accentGray">
                                  {tweet.user?.name}
                                </p>
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
        }
      })()}
    </div>
  );
};

export default TrendingList;
