import {
  MutationFunctionOptions,
  OperationVariables,
  DefaultContext,
  ApolloCache,
} from "@apollo/client";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import toast from "react-hot-toast";
import { ThemeType } from "../../pages";
import { IsDarkMode } from "../../utils/IsDarkMode";
import { Tweet } from "../Feed/TweetFeed";

interface Props {
  setIsReplyActive: (value: boolean) => void;
  isReplyActive: boolean;
  tweet: Tweet;
  setReplyText: (value: string) => void;
  replyText: string;
  addReply: (
    options?:
      | MutationFunctionOptions<
          any,
          OperationVariables,
          DefaultContext,
          ApolloCache<any>
        >
      | undefined
  ) => Promise<any>;
  theme: ThemeType;
}

export const Reply = ({
  isReplyActive,
  replyText,
  setIsReplyActive,
  setReplyText,
  tweet,
  addReply,
  theme,
}: Props) => {
  return (
    <div className={"z-40 absolute top-[40%] left-[25%] right-[25%] w-[50%] h-[30%] bg-black border-2 border-textWhiteH"}>
      <div className="w-full flex items-center">
        <div className="w-10 h-10 px-2 py-2 text-textWhiteH">
          <ArrowLeftIcon
            onClick={() => {
              setIsReplyActive(!isReplyActive);
            }}
          />
        </div>
        <p className={IsDarkMode(theme) ? "text-lg font-semibold ml-3" : "text-lg font-semibold ml-3 text-textWhiteH"}>
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
};
