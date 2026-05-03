const Header = () => {
  return (
    <header className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 text-white shadow-xl">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col items-center justify-center text-center gap-3">
          <span className="text-6xl">🎗️</span>
          <h1 className="text-3xl font-extrabold tracking-wide">
            Breast Cancer Classification
          </h1>
          <p className="text-indigo-200 text-sm max-w-md">
            AI Powered Early Detection System using Deep Learning
          </p>
          {/* Badge */}
          <div className="flex gap-3 mt-2">
            <span className="bg-white/20 px-4 py-1 rounded-full text-xs font-semibold">
              🧠 Deep Learning
            </span>
            <span className="bg-white/20 px-4 py-1 rounded-full text-xs font-semibold">
              ⚡ Real Time
            </span>
            <span className="bg-white/20 px-4 py-1 rounded-full text-xs font-semibold">
              🏥 Healthcare AI
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;