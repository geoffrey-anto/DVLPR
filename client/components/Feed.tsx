import {
  DotsHorizontalIcon,
  HeartIcon,
  RefreshIcon,
  ReplyIcon,
  ShareIcon,
} from "@heroicons/react/outline";
import React from "react";
import { Tweet } from "./TweetFeed";
import { GET_ALL_TWEETS, LIKE_TWEET } from "../graphql/Query";
import { useMutation } from "@apollo/client";
import Link from "next/link";
import { RETWEET_TWEET } from "../graphql/Mutation";
import toast from "react-hot-toast";
import { formatDate } from "../utils/FormatDate";

function Feed({ tweet, style }: { tweet: Tweet; style: string | undefined }) {
  const [likeTweet, { data, loading }] = useMutation(LIKE_TWEET, {
    refetchQueries: [{ query: GET_ALL_TWEETS }, "getAllTweets"],
  });
  const [isLiked, setIsLiked] = React.useState(false);
  const [retweetTweet, { error }] = useMutation(RETWEET_TWEET, {
    refetchQueries: [{ query: GET_ALL_TWEETS }, "getAllTweets"],
  });
  const [isRetweeted, setIsRetweeted] = React.useState(false);
  return (
    <div
      className={
        style ||
        "bg-black w-full h-full scrollbar-hide p-4 flex flex-col items-center"
      }
    >
      <div className="w-full h-auto flex flex-row items-center justify-between px-4 font-mono">
        {/* // Profile/Name */}
        <Link href={"/profile/" + tweet?.user?.id}>
          <div className="text-textWhiteH w-fit flex flex-row items-center justify-start gap-4 cursor-pointer">
            <img
              className="h-14 w-14 rounded-full"
              src="https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg"
            />
            {(() => {
              if (tweet?.isRepost) {
                return (
                  <div className="flex flex-col font-semibold">
                    <p>Retweeted By {tweet?.user?.name}</p>
                    <p>@{tweet?.user?.username}</p>
                  </div>
                );
              } else {
                return (
                  <div className="flex flex-col font-semibold">
                    <p>{tweet?.user?.name}</p>
                    <p>@{tweet?.user?.username}</p>
                  </div>
                );
              }
            })()}
          </div>
        </Link>

        {/* // MoreOptions */}
        <div className="h-8 w-8 text-textWhiteH">
          <DotsHorizontalIcon />
        </div>
      </div>
      <Link href={"/tweet/" + tweet?.id}>
        <div className="flex flex-col items-center">
          <div className="text-textWhiteH flex flex-col p-6 text-lg lg:text-xl font-light lg:font-light font-sans">
            <p>{tweet?.description}</p>
          </div>
          <img className="h-[55%]" src={tweet?.image} alt="" />
        </div>
      </Link>
      <div className="w-full mt-2 border-b-2 border-b-gray100">
        <p className="text-accentGray my-4">
          {formatDate(tweet?.createdAt)} · Twitter Web App
        </p>
      </div>
      <div className="w-full text-textWhite py-4 border-b-2 border-b-gray100">
        <div className="w-[70%] md:w-[80%] lg:w-[60%] flex items-center justify-around">
          <p>{tweet?.repostCount === null ? 0 : tweet?.repostCount} Retweets</p>
          <p>5 Quote Tweets</p>
          <p>{tweet?.likes} Likes</p>
        </div>
      </div>
      <div className="w-full h-fit mt-4 pb-4 px-8 text-textWhite border-b-2 border-b-gray100">
        <div className="flex flex-row items-center justify-between">
          <div className="h-6 w-6 cursor-pointer">
            <ReplyIcon />
          </div>
          <div className="h-6 w-6 cursor-pointer">
            <RefreshIcon
              className={isRetweeted ? "text-twitterBlue" : "text-textWhite"}
              onClick={async () => {
                if (tweet.user && tweet.id) {
                  const resp = await retweetTweet({
                    variables: {
                      userId: parseFloat(
                        (localStorage.getItem("authId") as string).toString()
                      ),
                      tweetId: parseFloat(tweet.id.toString()),
                    },
                  });
                  if (resp.data?.retweetTweet === false) {
                    toast("You have already retweeted this tweet", {
                      duration: 2000,
                    });
                    return;
                  }
                  setIsRetweeted(true);
                }
              }}
            />
          </div>
          <div className="h-6 w-6 cursor-pointer">
            <p className="text-textWhiteH"></p>
            <HeartIcon
              className={isLiked ? "text-[#F10C45]" : "text-textWhiteH"}
              onClick={async () => {
                setIsLiked(!isLiked);
                await likeTweet({ variables: { likeTweetId: tweet?.id } });
              }}
            />
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
