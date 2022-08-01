import { useMutation, useQuery } from "@apollo/client";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import SideBar from "../../components/SideBar/SideBar";
import { CHANGE_USER_NAME, CHANGE_USER_PASSWORD } from "../../graphql/Mutation";
import { GET_TWEETS_FOR_USER, GET_USER } from "../../graphql/Query";
import { checkPasswordChangeInputs } from "../../utils/CheckPasswordChangeInputs";
import Loading from "../../components/LoadingComponents/Loading";
import Back from "../../components/SubComponents/Back";
import UserProfile from "../../components/SubComponents/UserProfile";
import LeftPane from "../../components/LeftPane/LeftPane";
import NoUser from "../../components/SubComponents/NoUser";
import UserMenu from "../../components/SubComponents/UserMenu";
import UserProfileTweetFeed from "../../components/SubComponents/UserProfileTweetFeed";
import { ThemeType } from "..";
import { IsDarkMode } from "../../utils/IsDarkMode";

const Index = () => {
  const uId = useRouter().query.userId;

  const [loginedUser, setLoginedUser] = React.useState(-1);

  const [usernameActiveField, setUsernameActiveField] = React.useState(false);

  const [passwordActiveField, setPasswordActiveField] = React.useState(false);

  const [isReplyActive, setIsReplyActive] = React.useState(false);

  const [theme, setTheme] = useState<ThemeType>("dark");

  const [passwords, setPasswords] = React.useState<{
    oldPassword: string;
    newPassword: string;
  }>({
    oldPassword: "",
    newPassword: "",
  });

  const [newUserName, setNewUserName] = React.useState("");

  const { data, loading } = useQuery(GET_TWEETS_FOR_USER, {
    variables: {
      getTweetsForUserId: parseFloat(uId as string),
    },
  });

  const { data: userData, loading: userLoading } = useQuery(GET_USER, {
    variables: {
      getUserById: parseFloat(uId as string),
    },
  });

  const [changeUserName] = useMutation(CHANGE_USER_NAME);

  const [changeUserPassword] = useMutation(CHANGE_USER_PASSWORD);

  const [userDetails, setUserDetails] = useState<{
    id: number;
    username: string;
    name: string;
  }>({
    id: -1,
    username: "",
    name: "",
  });

  const signOut = () => {
    localStorage.removeItem("authId");
    localStorage.removeItem("authUserName");
    localStorage.removeItem("authName");
    localStorage.removeItem("authTime");
    window.location.href = "/";
  };

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
      signOut();
    }
  };

  useEffect(() => {
    const theme_ = localStorage.getItem("theme");
    if (theme_) {
      setTheme(theme_ as ThemeType);
    }
    const authId = localStorage.getItem("authId");
    const authUserName = localStorage.getItem("authUserName");
    const authName = localStorage.getItem("authName");

    if (authId && authUserName && authName) {
      const data = {
        id: parseFloat(authId as string),
        username: authUserName,
        name: authName,
      };

      setUserDetails(data);
    }

    window.addEventListener("keyup", (e) => {
      if (e.key === "Escape") {
        setUsernameActiveField(false);
        setPasswordActiveField(false);
      }
    });
    setLoginedUser(parseFloat(localStorage.getItem("authId") as string));
    if (
      (new Date().getTime() -
        parseInt(localStorage.getItem("authTime") as string)) /
        (1000 * 60 * 60 * 24) >
      1.0
    ) {
      signOut();
    }
  }, []);

  if (userLoading) {
    return <Loading theme={theme} />;
  } else if (userData?.getUserById === null) {
    return (
      <>
        <Head>
          <title>No User Found</title>
        </Head>
        <NoUser />
      </>
    );
  } else if (loading) {
    return <Loading theme={theme} />;
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
              ? IsDarkMode(theme)
                ? "overflow-hidden w-screen h-screen bg-black flex opacity-100 select-none"
                : "overflow-hidden w-screen h-screen bg-textWhiteH flex opacity-100 select-none"
              : IsDarkMode(theme)
              ? "overflow-hidden w-screen h-screen bg-black flex select-none"
              : "overflow-hidden w-screen h-screen bg-textWhiteH flex select-none"
          }
        >
          <Toaster />
          <SideBar
            theme={theme}
            containerStyle={undefined}
            isMobile={false}
            userDetails={userDetails}
            openTweetBox={() => {}}
          />
          <div className="w-full md:w-[50%] lg:w-[60%] xl:w-[55%] border-r-2 border-r-gray100">
            <div className="w-full h-2/3 border-b-2 border-gray100">
              <Back />
              {(() => {
                if (loading) {
                  return <Loading theme={theme} />;
                } else {
                  return (
                    <>
                      <div className="bg-gray100 w-full h-[25%]"></div>
                      <div className="flex flex-col w-full items-center justify-center mb-4">
                        <UserProfile
                          theme={theme}
                          data={userData?.getUserById}
                        />
                        {(() => {
                          if (
                            parseFloat(data?.getTweetsForUser[0]?.user?.id) ===
                            loginedUser
                          ) {
                            return (
                              <UserMenu
                                theme={theme}
                                changePasswordHandler={changePasswordHandler}
                                changeUserNameHandler={changeUserNameHandler}
                                data={data}
                                newUserName={newUserName}
                                passwords={passwords}
                                setPasswordActiveField={setPasswordActiveField}
                                setPasswords={setPasswords}
                                setNewUserName={setNewUserName}
                                passwordActiveField={passwordActiveField}
                                setUsernameActiveField={setUsernameActiveField}
                                usernameActiveField={usernameActiveField}
                              />
                            );
                          } else {
                            return null;
                          }
                        })()}
                      </div>
                      {(() => {
                        return (
                          <div
                            className={
                              IsDarkMode(theme)
                                ? "bg-black overflow-y-scroll h-full scrollbar-hide"
                                : "bg-textWhiteH overflow-y-scroll h-full scrollbar-hide"
                            }
                          >
                            <UserProfileTweetFeed
                              theme={theme}
                              isVisible={data.getTweetsForUser.length > 0}
                              data={data}
                              isReplyActive={isReplyActive}
                              setIsReplyActive={setIsReplyActive}
                            />
                          </div>
                        );
                      })()}
                    </>
                  );
                }
              })()}
            </div>
            {<div className="overflow-y-scroll scrollbar-hide"></div>}
          </div>
          <LeftPane
            toggleTheme={() => {
              setTheme(theme === "light" ? "dark" : "light");
              localStorage.setItem("theme", theme === "light" ? "dark" : "light");
              console.log(theme)
            }}
            theme={theme}
            signOut={signOut}
          />
        </div>
      </>
    );
};

export default Index;
