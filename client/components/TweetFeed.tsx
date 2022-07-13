import Feed from "./Feed";
import TweetBox from "./TweetBox";

function TweetFeed() {
  return (
    <div className="bg-black w-full md:w-[50%] lg:w-[55%] xl:w-[58%] border border-r-gray100 overflow-x-scroll scrollbar-hide">
      <div className="sticky top-0">
        <TweetBox />
      </div>
      <div>
        <Feed />
        <Feed />
        <Feed />
        <Feed />
      </div>
    </div>
  );
}

export default TweetFeed;
