import {
  ChartBarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  StarIcon,
} from "@heroicons/react/outline";
import TweetButton from "./TweetButton";

function TweetBox() {
  return (
    <div className="bg-black w-full h-fit">
      <div className="w-full flex flex-row items-center justify-between text-textWhiteH px-8 py-4">
        <p className="text-2xl font-bold">Home</p>
        <div className="h-10 w-10 sm:h-8 sm:w-8">
          <StarIcon />
        </div>
      </div>
      <div className="flex flex-row items-center justify-center lg:items-start lg:justify-between w-full h-full px-0 lg:px-5">
        <img
          className="w-0 h-0 lg:w-[55px] lg:h-[55px] rounded-full mt-5"
          src="https://img.freepik.com/free-photo/close-up-young-successful-man-smiling-camera-standing-casual-outfit-against-blue-background_1258-66609.jpg?w=2000"
        />
        <div className="h-full w-[87%]">
          <form className="flex flex-col space-y-5">
            <input
              placeholder="What's Happening?"
              inputMode="text"
              style={{textTransform: "capitalize"}}
              className="bg-black w-full h-16 lg:h-20 text-textWhiteH border-textWhiteH border-b-2 font-semibold text-lg focus:outline-none focus:border-b-textWhiteH caret-twitterBlue px-4"
            />
            <div className="flex items-center justify-between">
              <div className="h-fit w-fit flex flex-row text-textWhiteH gap-1">
                <div className="h-6 w-6">
                  <PhotographIcon />
                </div>
                <div className="h-6 w-6">
                  <ChartBarIcon />
                </div>
                <div className="h-6 w-6">
                  <EmojiHappyIcon />
                </div>
                <div className="h-6 w-6">
                  <LocationMarkerIcon />
                </div>
              </div>
              <TweetButton styles="text-black bg-twitterBlue h-12 w-[20%] text-center rounded-full text-lg md:text-xl text-bold" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TweetBox;
