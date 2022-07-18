import { useQuery } from "@apollo/client";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Feed from "../../components/Feed";
import { GET_TWEET_BY_ID } from "../../graphql/Query";

function Home() {
  const router = useRouter();
  const { data }: { data: any } = useQuery(GET_TWEET_BY_ID, {
    variables: {
      tweetId: parseFloat(router.query.userId as string),
    },
  });
  useEffect(() => {
    if (
      (new Date().getTime() -
        parseInt(localStorage.getItem("authTime") as string)) /
        (1000 * 60) >
      15.0
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
  } else
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
          <div className="flex justify-center">
            <div className="w-[60%] h-auto">
              <Feed style="" tweet={data?.getTweetById} />
            </div>
          </div>
        </div>
      </>
    );
}

export default Home;
