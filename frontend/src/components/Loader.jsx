const Loader = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 flex flex-col items-center justify-center z-50">
      {/* Spinner */}
      <div className="relative mb-6">
        <div className="w-20 h-20 border-4 border-white/30 rounded-full"></div>
        <div className="w-20 h-20 border-4 border-white border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
        <div className="absolute inset-0 flex items-center justify-center text-3xl">
          🎗️
        </div>
      </div>

      {/* Text */}
      <h2 className="text-white text-2xl font-bold mb-2">
        Breast Cancer AI
      </h2>
      <p className="text-indigo-200 text-sm">
        Loading Deep Learning Model...
      </p>

      {/* Dots Animation */}
      <div className="flex gap-2 mt-6">
        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
      </div>
    </div>
  );
};

export default Loader;