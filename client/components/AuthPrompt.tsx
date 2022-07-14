import { ArrowLeftIcon } from "@heroicons/react/outline";


// TRANSFER THE AUTH LOGIC FROM INDEX.TSX TO AUTHPROMPT.TSX AND ALSO IMPLEMENT THE SAME FOR lOGIN USER WITH ID NAME

const AuthPrompt = ({ style }: { style: string }) => {
  return (
    <div className={`${style} h-full bg-black z-50 opacity-100`}>
      <div className="text-textWhiteH w-8 h-8 ml-4 mt-4">
        <ArrowLeftIcon />
      </div>
      <form className="w-2/3 h-2/3 md:w-[50%] lg:w-1/3 bg-textWhiteH opacity-100 ml-auto mr-auto mt-[8%] rounded-lg flex flex-col items-center justify-evenly">
        <p className="text-2xl font-bold">Register</p>
        <div className="flex flex-col w-[70%] h-[70%] items-center justify-evenly border-2 border-black">
          <input placeholder="Name" type={"text"} className="border-black border-b-2 w-[70%] h-[13%] bg-lightGray rounded-t-lg pl-4" />
          <input placeholder="Username" type={"text"} className="border-black border-b-2 w-[70%] h-[13%] bg-lightGray rounded-t-lg pl-4" />
          <input placeholder="Email" type={"email"} className="border-black border-b-2 w-[70%] h-[13%] bg-lightGray rounded-t-lg pl-4" />
          <input placeholder="Password" type={"password"} className="border-black border-b-2 w-[70%] h-[13%] bg-lightGray rounded-t-lg pl-4" />
        </div>
        <button className="w-[50%] h-10 bg-twitterBlue text-lg text-black font-semibold">Submit</button>
      </form>
    </div>
  );
};

export default AuthPrompt;
