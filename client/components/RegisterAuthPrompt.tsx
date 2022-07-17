import { useMutation } from "@apollo/client";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { MouseEvent, useState } from "react";
import { REGISTER_USER } from "../graphql/Mutation";
import { authStatusType } from "../pages";

// TRANSFER THE AUTH LOGIC FROM INDEX.TSX TO AUTHPROMPT.TSX AND ALSO IMPLEMENT THE SAME FOR lOGIN USER WITH ID NAME

const AuthPrompt = ({
  style,
  cb,
}: {
  style: string;
  cb: (isAuthenticated: authStatusType, data: any|undefined) => void;
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [registerUser] = useMutation(REGISTER_USER);

  const registerHandler = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    const response = await registerUser({
      variables: {
        data: {
          name,
          email,
          username,
          password,
        },
      },
    });
    if (response.data.Register === true) {
      cb("registered", undefined);
    } else {
      alert("Please Enter Valid Details");
    }
  };

  return (
    <>
    <img
        src="https://i.ytimg.com/vi/GF0gWwv04gM/maxresdefault.jpg"
        className="w-[110vw] h-[110vh] fixed z-20 object-fill blur-md"
      />
    <div className={`${style} h-full z-30 opacity-100`}>
    <p className="absolute top-8 left-[40%] font-bold text-6xl text-textWhiteH font-mono">DeVeLoPeR</p>
      <div className="flex items-center px-8 ">
        <div
          onClick={() => {
            cb("registered", undefined);
          }}
          className=" cursor-pointer flex"
        >
          <div className="text-textWhiteH w-8 h-8 mt-4">
            <ArrowLeftIcon />
          </div>
          <p className="text-textWhiteH mt-4 font-bold ml-4 text-xl">LogIn</p>
        </div>
      </div>
      <form className="w-2/3 h-2/3 md:w-[50%] lg:w-1/3 bg-textWhiteH opacity-80 ml-auto mr-auto mt-[8%] rounded-lg flex flex-col items-center justify-evenly">
        <p className="text-2xl font-bold">Register</p>
        <div className="flex flex-col w-[70%] h-[70%] items-center justify-evenly border-2 border-black">
          <input
            placeholder="Name"
            type={"text"}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="border-black border-b-2 w-[70%] h-[13%] bg-lightGray rounded-t-lg pl-4"
          />
          <input
            placeholder="Username"
            type={"text"}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            className="border-black border-b-2 w-[70%] h-[13%] bg-lightGray rounded-t-lg pl-4"
          />
          <input
            placeholder="Email"
            type={"email"}
            autoComplete={"off"}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="border-black border-b-2 w-[70%] h-[13%] bg-lightGray rounded-t-lg pl-4"
          />
          <input
            placeholder="Password"
            type={"password"}
            autoComplete={"off"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="border-black border-b-2 w-[70%] h-[13%] bg-lightGray rounded-t-lg pl-4"
          />
        </div>
        <button
          onClick={(e) => registerHandler(e)}
          className="w-[50%] h-10 bg-twitterBlue text-lg text-black font-semibold"
        >
          Submit
        </button>
      </form>
    </div>
    </>
  );
};

export default AuthPrompt;
