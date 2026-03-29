import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="fixed inset-0 lg:pl-64 flex items-center justify-center">
      <div className="relative flex items-center justify-center">
        <Loader className="h-10 w-10 text-sky-400 animate-spin" />
        <div className="absolute h-16 w-16 rounded-full border-2 border-sky-400/20 animate-pulse" />
      </div>
    </div>
  );
};

export default Loading;