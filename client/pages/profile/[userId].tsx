import { useMutation, useQuery } from "@apollo/client";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Feed from "../../components/Feed";
import SideBar from "../../components/SideBar";
import { CHANGE_USER_NAME, CHANGE_USER_PASSWORD } from "../../graphql/Mutation";
import { GET_TWEETS_FOR_USER } from "../../graphql/Query";
import { checkPasswordChangeInputs } from "../../utils/CheckPasswordChangeInputs";

const Index = () => {
  const uId = useRouter().query.userId;

  const [loginedUser, setLoginedUser] = React.useState(-1);

  const [usernameActiveField, setUsernameActiveField] = React.useState(false);

  const [passwordActiveField, setPasswordActiveField] = React.useState(false);

  const [passwords, setPasswords] = React.useState<{
    oldPassword: string;
    newPassword: string;
  }>({
    oldPassword: "",
    newPassword: "",
  });

  const [newUserName, setNewUserName] = React.useState("");

  const { data } = useQuery(GET_TWEETS_FOR_USER, {
    variables: {
      getTweetsForUserId: parseFloat(uId as string),
    },
  });

  const [changeUserName] = useMutation(CHANGE_USER_NAME);

  const [changeUserPassword] = useMutation(CHANGE_USER_PASSWORD);

  const changeUserNameHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    newUserName: string,
    email: string
  ) => {
    e.preventDefault();
    if (newUserName.length < 5) {
      toast("Username must be at least 5 characters long");
      return;
    }
    const response = await changeUserName({
      variables: {
        newUsername: newUserName,
        email: email,
      },
    });

    if (response.data?.changeUsername === true) {
      toast("Username changed successfully");
      setNewUserName("");
      window.location.reload();
    } else {
      toast("Something went wrong");
    }
  };

  const changePasswordHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    email: string
  ) => {
    e.preventDefault();
    if (
      !checkPasswordChangeInputs(
        email,
        passwords.oldPassword,
        passwords.newPassword
      )
    ) {
      toast("Please enter valid details");
      return;
    }
    const response = await changeUserPassword({
      variables: {
        newPassword: passwords.newPassword,
        oldPassword: passwords.oldPassword,
        email: email,
      },
    });
    if (response.data?.changeUserPassword === false) {
      toast("Wrong password or email");
    } else {
      toast("Password changed");
      localStorage.removeItem("authId");
      localStorage.removeItem("authUserName");
      localStorage.removeItem("authName");
      localStorage.removeItem("authTime");
      window.location.href = "/";
    }
  };

  useEffect(() => {
    setLoginedUser(parseFloat(localStorage.getItem("authId") as string));
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
    return (
      <>
        <Head>
          <title>No User Found</title>
        </Head>
        <div className="w-screen h-screen bg-black">
          <Toaster />
          <div className="flex justify-center items-center h-screen">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-textWhiteH">
                No User Found
              </h1>
            </div>
          </div>
        </div>
      </>
    );
  } else
    return (
      <>
        <Head>
          <title>
            {data?.getTweetsForUser[0]?.user?.username?.toUpperCase() || " "}
          </title>
        </Head>
        <div
          className={
            usernameActiveField
              ? "overflow-hidden w-screen h-screen bg-black flex opacity-100"
              : "overflow-hidden w-screen h-screen bg-black flex"
          }
        >
          <Toaster />
          <SideBar
          containerStyle={undefined}
          isMobile={false}
            userDetails={
              data?.getTweetsForUser ? data?.getTweetsForUser[0]?.user : {}
            }
          />
          <div className="w-full md:w-[50%] lg:w-[60%] xl:w-[55%] border-r-2 border-r-gray100">
            <div className="w-full h-2/3 border-b-2 border-gray100">
              <div className="w-full h-[12%] flex items-center px-4">
                <Link href={"/"}>
                  <div className="w-6 h-6 text-lightGray cursor-pointer">
                    <ArrowLeftIcon />
                  </div>
                </Link>
              </div>
              <div className="bg-gray100 w-full h-[25%]"></div>
              <div className="flex flex-col w-full items-center justify-center mb-4">
                <div>
                  <img
                    className="w-24 h-24 z-10 relative -top-12 rounded-full left-2"
                    src="https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg"
                  />
                  <div className="w-full relative -top-6">
                    <div className="bg- w-[110%] flex flex-col items-center justify-center">
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
                  </div>
                </div>
                {(() => {
                  if (
                    parseFloat(data?.getTweetsForUser[0]?.user?.id) ===
                    loginedUser
                  ) {
                    return (
                      <div className="w-full h-fit flex flex-row items-center justify-center space-x-8 flex-wrap">
                        <button
                          onClick={() => {
                            setPasswordActiveField(!passwordActiveField);
                          }}
                          className="w-auto px-2 h-12 bg-twitterBlue text-black"
                        >
                          Change Password
                        </button>
                        <button
                          onClick={() => {
                            setUsernameActiveField(!usernameActiveField);
                          }}
                          className="w-auto px-2 h-12 bg-twitterBlue text-black"
                        >
                          Change Username
                        </button>
                        <div
                          className={
                            passwordActiveField
                              ? "absolute top-[28%] left-[28%] z-50 w-[40%] h-[40%] bg-black border-2 border-textWhiteH"
                              : "hidden"
                          }
                        >
                          <div className="w-full h-full flex flex-col">
                            <div className="h-10 w-10 p-2 text-textWhiteH">
                              <ArrowLeftIcon
                                className="cursor-pointer"
                                onClick={() => {
                                  setPasswordActiveField(false);
                                }}
                              />
                            </div>
                            <div className="w-full h-full  flex flex-col items-center justify-evenly -mt-4">
                              <p className="text-textWhiteH font-semibold">
                                Enter The New Password!
                              </p>
                              <input
                                type={"password"}
                                placeholder="Enter New Password!"
                                className="w-56 h-10 px-4 text-black"
                                onChange={(e) => {
                                  const newPassword = e.target.value;
                                  const obj = {
                                    newPassword: newPassword,
                                    oldPassword: passwords.oldPassword,
                                  };
                                  setPasswords(obj);
                                }}
                              />
                              <input
                                type={"password"}
                                placeholder="Enter Old Password!"
                                className="w-56 h-10 px-4 text-black"
                                onChange={(e) => {
                                  const oldPassword = e.target.value;
                                  const obj = {
                                    newPassword: passwords.newPassword,
                                    oldPassword: oldPassword,
                                  };
                                  setPasswords(obj);
                                }}
                              />
                              <button
                                className="bg-twitterBlue w-20 h-10"
                                onClick={(e) => {
                                  changePasswordHandler(
                                    e,
                                    data?.getTweetsForUser[0]?.user?.email
                                  );
                                }}
                              >
                                Submit!
                              </button>
                            </div>
                          </div>
                        </div>
                        <div
                          className={
                            usernameActiveField
                              ? "absolute top-[28%] left-[28%] z-50 w-[40%] h-[40%] bg-black border-2 border-textWhiteH"
                              : "hidden"
                          }
                        >
                          <div className="w-full h-full flex flex-col">
                            <div className="h-10 w-10 p-2 text-textWhiteH">
                              <ArrowLeftIcon
                                className="cursor-pointer"
                                onClick={() => {
                                  setUsernameActiveField(false);
                                }}
                              />
                            </div>
                            <div className="w-full h-full  flex flex-col items-center justify-evenly -mt-4">
                              <p className="text-textWhiteH font-semibold">
                                Enter The New User Name!
                              </p>
                              <input
                                type={"text"}
                                placeholder="Enter New Username!"
                                className="w-56 h-10 px-4 text-black"
                                onChange={(e) => {
                                  setNewUserName(e.target.value);
                                }}
                              />
                              <button
                                className="bg-twitterBlue w-20 h-10"
                                onClick={(e) => {
                                  changeUserNameHandler(
                                    e,
                                    newUserName,
                                    data?.getTweetsForUser[0]?.user?.email
                                  );
                                }}
                              >
                                Submit!
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  } else {
                    return null;
                  }
                })()}
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
              onClick={() => {
                localStorage.removeItem("authId");
                localStorage.removeItem("authUserName");
                localStorage.removeItem("authName");
                localStorage.removeItem("authTime");
                window.location.href = "/";
              }}
            >
              {"Sign Out"}
            </button>
          </div>
        </div>
      </>
    );
};

export default Index;
