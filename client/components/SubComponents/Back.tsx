import { ArrowLeftIcon } from "@heroicons/react/outline";
import Link from "next/link";
import React from "react";

const Back = () => {
  return (
    <div className="w-full h-[12%] flex items-center px-4">
      <Link href={"/"}>
        <div className="w-6 h-6 text-lightGray cursor-pointer">
          <ArrowLeftIcon />
        </div>
      </Link>
    </div>
  );
};

export default Back;
