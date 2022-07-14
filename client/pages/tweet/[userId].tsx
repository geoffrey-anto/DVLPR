import { useQuery } from "@apollo/client";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Feed from "../../components/Feed";
import { GET_TWEET_BY_ID } from "../../graphql/Query";

function Home() {
  const router = useRouter();
  const { data }: { data: any } = useQuery(GET_TWEET_BY_ID, {
    variables: {
      tweetId: parseFloat(router.query.userId as string),
    },
  });
  return (
    <div className="bg-black w-screen h-screen overflow-y-scroll scrollbar-hide">
      <div className="pt-2 pl-2">
        <div className="w-8 h-8 text-twitterBlue">
          <Link href={"/"}>
            <ArrowLeftIcon />
          </Link>
        </div>
      </div>
      <div className="w-full h-full">
        <Feed tweet={data?.getTweetById} />
      </div>
    </div>
  );
}

export default Home;
