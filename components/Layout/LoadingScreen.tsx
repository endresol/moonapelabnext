export const LoadingScreen = ({height}) => {
  return (
    <div className="flex justify-center items-center h-12">
    <div className="h-2 w-2 rounded-full bg-gray-400 mx-1 delay-100 animate-loading-dot" ></div>
    <div className="h-2 w-2 rounded-full bg-gray-400 mx-1 delay-300 animate-loading-dot"></div>
    <div className="h-2 w-2 rounded-full bg-gray-400 mx-1 delay-500 animate-loading-dot"></div>
  </div>
  );
};

