import React from "react";
import { Toaster } from "react-hot-toast";

const NoUser = () => {
  return (
    <div className="w-screen h-screen bg-black">
      <Toaster />
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-textWhiteH">No User Found</h1>
        </div>
      </div>
    </div>
  );
};

export default NoUser;
