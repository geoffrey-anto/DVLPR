import { useMutation } from "@apollo/client";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { LOGIN_USER_WITH_ID_NAME } from "../graphql/Mutation";
import { authStatusType } from "../pages";

function LoginAuthPrompt({
  style,
  cb,
}: {
  style: string;
  cb: (isAuthenticated: authStatusType, data: any | undefined) => void;
}) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [loginUser] = useMutation(LOGIN_USER_WITH_ID_NAME);

  const loginHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const response = await loginUser({
      variables: {
        loginInput: {
          email,
          password,
        },
      },
    });
    console.log(response)
    if (response.data.Login !== null) {
      localStorage.setItem("authId", response.data.Login.id);
      localStorage.setItem("authUserName", response.data.Login.name);
      localStorage.setItem("authName", response.data.Login.username);
      localStorage.setItem("authTime", new Date().getTime().toString());
      cb("logged", response.data.Login);
      window.location.reload();
    } else {
      toast("Please Enter Valid Details");
    }
  };

  return (
    <>
      <img
        src="https://i.ytimg.com/vi/GF0gWwv04gM/maxresdefault.jpg"
        className="w-[110vw] h-[110vh] fixed z-10 object-fill blur-md"
      />
      <div className={`${style} h-full z-30`}>
        <Toaster />
        <p className="absolute top-8 left-[40%] font-bold text-6xl text-textWhiteH font-mono">DeVeLoPeR</p>
        <div className="flex items-center px-8">
          <div
            onClick={() => {
              cb(null, undefined);
            }}
            className="cursor-pointer flex"
          >
            <div className="text-textWhiteH w-8 h-8 mt-4">
              <ArrowLeftIcon />
            </div>
            <p className="text-textWhiteH ml-4  mt-4 font-bold text-xl">
              Register
            </p>
          </div>
        </div>
        <form className="w-2/3 h-2/3 md:w-[50%] lg:w-1/3 bg-textWhiteH opacity-80 ml-auto mr-auto mt-[8%] rounded-lg flex flex-col items-center justify-evenly">
          <p className="text-2xl font-bold">Login</p>
          <div className="flex flex-col w-[70%] h-[60%] items-center justify-evenly border-2 border-black">
            <input
              placeholder="Email"
              type={"email"}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="border-black border-b-2 w-[70%] h-[13%] bg-lightGray rounded-t-lg pl-4"
            />
            <input
              placeholder="Password"
              type={"password"}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="border-black border-b-2 w-[70%] h-[13%] bg-lightGray rounded-t-lg pl-4"
            />
          </div>
          <button
            onClick={loginHandler}
            className="w-[50%] h-10 bg-twitterBlue text-lg text-black font-semibold"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default LoginAuthPrompt;
