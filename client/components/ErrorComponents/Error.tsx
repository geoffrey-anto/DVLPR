import { ExclamationIcon } from "@heroicons/react/outline";

const Error = () => {
  return (
    <div className="flex items-center justify-center text-textWhiteH w-full h-full gap-4">
      <p className="text-2xl">ERROR</p>
      <div className="w-10 h-10 text-textWhiteH">
      <ExclamationIcon />
      </div>
    </div>
  );
};

export default Error;
