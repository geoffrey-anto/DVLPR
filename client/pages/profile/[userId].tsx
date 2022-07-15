import { useQuery } from "@apollo/client";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Feed from "../../components/Feed";
import SideBar from "../../components/SideBar";
import { GET_TWEETS_FOR_USER } from "../../graphql/Query";

const Index = () => {
  const uId = useRouter().query.userId;
  const { data, error } = useQuery(GET_TWEETS_FOR_USER, {
    variables: {
      getTweetsForUserId: parseFloat(uId as string),
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
  if (data?.getTweetsForUser?.length === 0) {
    return <div className="w-screen h-screen bg-black">
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-textWhiteH">No User Found</h1>
        </div>
      </div>
    </div>;
  } else
    return (
      <div className="overflow-hidden w-screen h-screen bg-black flex">
        <SideBar
          userDetails={
            data?.getTweetsForUser ? data?.getTweetsForUser[0]?.user : {}
          }
        />
        <div className="w-full md:w-[50%] lg:w-[60%] xl:w-[55%] border-r-2 border-r-gray100">
          <div className="w-full h-2/3 border-b-2 border-gray100">
            <div className="w-full h-[12%] flex items-center px-4">
              <div className="w-6 h-6 text-lightGray">
                <ArrowLeftIcon />
              </div>
            </div>
            <div className="bg-gray100 w-full h-[25%]"></div>
            <img
              className="w-24 h-24 z-10 relative -top-12 left-10 rounded-full"
              src="https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg"
            />
            <div className="w-full relative -top-6 ml-6">
              <p className="text-textWhiteH font-semibold text-lg">
                {data?.getTweetsForUser
                  ? data?.getTweetsForUser[0]?.user?.name
                  : ""}
              </p>
              <p className="text-accentGray font-semibold text-lg">
                @
                {data?.getTweetsForUser
                  ? data?.getTweetsForUser[0]?.user?.username
                  : ""}
              </p>
            </div>
            <div className="overflow-y-scroll w-full h-[80%] scrollbar-hide">
              {data?.getTweetsForUser?.map((tweet: any) => {
                return (
                  <Feed
                    key={tweet?.id}
                    style="bg-black w-full h-fit scrollbar-hide p-4 flex flex-col items-center"
                    tweet={tweet}
                  />
                );
              })}
            </div>
          </div>
          {<div className="overflow-y-scroll scrollbar-hide"></div>}
        </div>
        <div className="hidden flex-1 md:flex justify-center pt-5">
          <button
            placeholder="SignIn"
            className="w-1/2 max-h-10 rounded-2xl border-2 border-textWhiteH text-textWhite"
          >
            {"Sign Out"}
          </button>
        </div>
      </div>
    );
};

export default Index;
