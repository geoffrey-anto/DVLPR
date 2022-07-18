import {
  ArrowLeftIcon,
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
import { REPLY_FOR_TWEET, RETWEET_TWEET } from "../graphql/Mutation";
import toast, { Toaster } from "react-hot-toast";
import { formatDate } from "../utils/FormatDate";

function Feed({ tweet, style }: { tweet: Tweet; style: string | undefined }) {
  const [likeTweet, { loading }] = useMutation(LIKE_TWEET, {
    refetchQueries: [{ query: GET_ALL_TWEETS }, "getAllTweets"],
  });
  const [isLiked, setIsLiked] = React.useState(false);
  const [retweetTweet] = useMutation(RETWEET_TWEET, {
    refetchQueries: [{ query: GET_ALL_TWEETS }, "getAllTweets"],
  });
  const [isRetweeted, setIsRetweeted] = React.useState(false);

  const [addReply] = useMutation(REPLY_FOR_TWEET, {
    refetchQueries: [{ query: GET_ALL_TWEETS }, "getAllTweets"],
  });

  const [isReplyActive, setIsReplyActive] = React.useState(false);

  const [replyText, setReplyText] = React.useState("");
  if (loading) {
    return <div className="w-full h-full bg-black"></div>;
  }

  return (
    <div
      className={
        style ||
        "bg-black w-full h-full scrollbar-hide p-4 flex flex-col items-center"
      }
    >
      <Toaster />
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
                  <div className="flex flex-col font-semibold w-48 lg:w-full">
                    <p className="text-sm lg:text-lg">
                      Retweeted By {tweet?.user?.name}
                    </p>
                    <p className="text-sm lg:text-lg">
                      @{tweet?.user?.username}
                    </p>
                  </div>
                );
              } else {
                return (
                  <div className="flex flex-col font-semibold w-48 lg:w-full">
                    <p className="text-sm lg:text-lg">{tweet?.user?.name}</p>
                    <p className="text-sm lg:text-lg">
                      @{tweet?.user?.username}
                    </p>
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
        <div className="flex flex-col items-center h-[55%]">
          <div className="text-textWhiteH flex flex-col p-6 text-lg lg:text-xl font-light lg:font-light font-sans">
            <p>{tweet?.description}</p>
          </div>
          <img className="h-[50%]" src={tweet?.image} alt="" />
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
          <p>{tweet?.replies?.length} Quote Tweets</p>
          <p>{tweet?.likes} Likes</p>
        </div>
      </div>
      <div className="w-full h-fit mt-4 pb-4 px-8 text-textWhite">
        <div className="flex flex-row items-center justify-between">
          <div className="h-6 w-6 cursor-pointer">
            <ReplyIcon
              onClick={() => {
                setIsReplyActive(!isReplyActive);
              }}
            />
            {(() => {
              if (isReplyActive) {
                return (
                  <div className="z-40 absolute top-[40%] left-[25%] right-[25%] w-[50%] h-[30%] bg-black border-2 border-textWhiteH">
                    <div className="w-full flex items-center">
                      <div className="w-10 h-10 px-2 py-2">
                        <ArrowLeftIcon
                          onClick={() => {
                            setIsReplyActive(!isReplyActive);
                          }}
                        />
                      </div>
                      <p className="text-lg font-semibold ml-3">
                        Reply to {tweet?.user?.username}
                      </p>
                    </div>
                    <div className="flex flex-col items-center justify-around h-[60%]">
                      <input
                        type={"text"}
                        onChange={(e) => {
                          setReplyText(e.target.value);
                        }}
                        className="w-[80%] h-12 bg-black border-b-2 border-b-textWhite text-lg pl-2"
                      />
                      <button
                        onClick={async () => {
                          if (replyText === "") {
                            toast.error("Please enter a reply");
                            return;
                          }
                          const response = await addReply({
                            variables: {
                              tweetId: tweet?.id,
                              description: replyText,
                            },
                          });
                          if (response.data?.addReplyForTweet) {
                            toast.success("Reply added successfully");
                            setIsReplyActive(false);
                          } else {
                            toast.error("Something went wrong");
                            setIsReplyActive(false);
                          }
                        }}
                        className="border-2 border-twitterBlue w-[30%] h-[30%] bg-twitterBlue text-lg font-semibold text-black"
                      >
                        Reply!
                      </button>
                    </div>
                  </div>
                );
              }
            })()}
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
                  window.scrollTo(0, 0);
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
