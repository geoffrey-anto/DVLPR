import React from "react";
import TrendingList from "./TrendingList";

interface Props {
  signOut: () => void;
}

const LeftPane = ({ signOut }: Props) => {
  return (
    <div className="hidden md:flex-col md:flex-1 md:flex justify-between pt-5">
      <div className="w-[100%] h-[10%] flex items-center justify-center">
        <button
          placeholder="SignIn"
          className="w-48 h-12 rounded-2xl border-2 border-textWhiteH text-textWhite"
          onClick={() => {
            signOut();
          }}
        >
          {"Sign Out"}
        </button>
      </div>
      <div className="w-full h-[90%]">
        <TrendingList />
      </div>
    </div>
  );
};

export default LeftPane;
