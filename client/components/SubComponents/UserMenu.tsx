import { ArrowLeftIcon } from "@heroicons/react/outline";
import React from "react";
import { ThemeType } from "../../pages";

interface Props {
  setPasswordActiveField: (value: boolean) => void;
  passwordActiveField: boolean;
  setUsernameActiveField: (value: boolean) => void;
  usernameActiveField: boolean;
  setPasswords: (value: { newPassword: string; oldPassword: string }) => void;
  passwords: { newPassword: string; oldPassword: string };
  changePasswordHandler: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    email: string
  ) => void;
  data: any;
  setNewUserName: (value: string) => void;
  newUserName: string;
  changeUserNameHandler: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    newUserName: string,
    email: string
  ) => void;
  theme: ThemeType;
}

const UserMenu = ({
  changePasswordHandler,
  changeUserNameHandler,
  data,
  newUserName,
  passwordActiveField,
  passwords,
  setNewUserName,
  setPasswordActiveField,
  setPasswords,
  setUsernameActiveField,
  usernameActiveField,
}: Props) => {
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
};

export default UserMenu;
