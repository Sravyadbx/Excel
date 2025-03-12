const Loading = () => {
  return (
    <div className="flex justify-center items-center space-x-2">
      <div className="w-6 h-6 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      <span className="text-lg text-blue-500">Loading...</span>
    </div>
  );
};

export default Loading;
