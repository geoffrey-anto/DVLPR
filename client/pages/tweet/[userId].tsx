import { useQuery } from "@apollo/client";
import { ArrowLeftIcon, ChevronDownIcon } from "@heroicons/react/outline";
import { Jelly } from "@uiball/loaders";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Feed from "../../components/Feed";
import { GET_REPLY_FOR_TWEET, GET_TWEET_BY_ID } from "../../graphql/Query";

function Home() {
  const router = useRouter();

  const [isReplyActive, setIsReplyActive] = useState(false);

  const { data, loading }: { data: any; loading: boolean } = useQuery(
    GET_TWEET_BY_ID,
    {
      variables: {
        tweetId: parseFloat(router.query.userId as string),
      },
    }
  );

  const { data: replyData } = useQuery(GET_REPLY_FOR_TWEET, {
    variables: {
      tweetId: parseFloat(router.query.userId as string),
    },
  });
  useEffect(() => {
    console.log(localStorage.getItem("authId"));
    if (
      (new Date().getTime() -
        parseInt(localStorage.getItem("authTime") as string)) /
        (1000 * 60 * 60 * 24) >
        1.0 ||
      localStorage.getItem("authId") === null
    ) {
      localStorage.removeItem("authId");
      localStorage.removeItem("authUserName");
      localStorage.removeItem("authName");
      localStorage.removeItem("authTime");
      window.location.href = "/";
    }
  }, []);
  if (data?.getTweetById?.length === 0) {
    return (
      <div className="w-screen h-screen bg-black">
        <div className="flex justify-center items-center h-screen">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-textWhiteH">
              No User Found
            </h1>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <Head>
          <title>
            {(data?.getTweetById?.user?.username as string)?.toUpperCase() ||
              " "}
          </title>
        </Head>
        <div className="bg-black w-screen h-screen overflow-y-scroll scrollbar-hide">
          <div className="pt-2 pl-2">
            <div className="w-8 h-8 text-twitterBlue">
              <Link href={"/"}>
                <ArrowLeftIcon />
              </Link>
            </div>
          </div>
          {(() => {
            if (loading) {
              return (
                <div className="w-full h-screen flex items-center justify-center bg-black">
                  <Jelly color={"#1D9BF0"} size={50} />
                </div>
              );
            } else {
              return (
                <div className="flex justify-center">
                  <div className="w-[60%] h-fit">
                    <Feed
                      style=""
                      tweet={data?.getTweetById}
                      replyCount={replyData?.getReplies?.length}
                    />
                    <div className="w-[95%] h-fit -mt-2 mb-4 flex flex-col justify-between border-b-2 border-b-accentGray pb-2">
                      {(() => {
                        if (replyData?.getReplies?.length !== 0) {
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
                      {isReplyActive
                        ? replyData?.getReplies?.map(
                            (
                              tweetX: {
                                description: string;
                                repliedUsername: string;
                                id: number;
                              },
                              index: number
                            ) => {
                              if (index > 10) return null;
                              return (
                                <div
                                  key={index}
                                  className="flex flex-col md:px-8  md:min-w-[300px] w-fit px-10 items-start justify-between text-textWhiteH mx-4 mb-4 py-2 border-2 border-twitterBlue rounded-xl "
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
            }
          })()}
        </div>
      </>
    );
  }
}

export default Home;
