import { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import CSVUpload from "./components/CSVUpload";
import ManualInput from "./components/ManualInput";
import Result from "./components/Result";
import Loader from "./components/Loader";

const App = () => {
  const [activeTab, setActiveTab] = useState("csv");
  const [result, setResult] = useState(null);
  const [appLoading, setAppLoading] = useState(true);
  const resultRef = useRef(null);

  // App load hone pe 2.5 second loader
  useEffect(() => {
    setTimeout(() => {
      setAppLoading(false);
    }, 2500);
  }, []);

  // Result aane pe auto scroll karo
  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [result]);

  if (appLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl shadow-md p-1 flex gap-1">
            <button
              onClick={() => {
                setActiveTab("csv");
                setResult(null);
              }}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === "csv"
                  ? "bg-indigo-600 text-white shadow"
                  : "text-gray-500 hover:text-indigo-600"
              }`}
            >
              📁 CSV Upload
            </button>
            <button
              onClick={() => {
                setActiveTab("manual");
                setResult(null);
              }}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === "manual"
                  ? "bg-indigo-600 text-white shadow"
                  : "text-gray-500 hover:text-indigo-600"
              }`}
            >
              ✏️ Manual Input
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-3xl mx-auto">
          {activeTab === "csv" ? (
            <CSVUpload setResult={setResult} />
          ) : (
            <ManualInput setResult={setResult} />
          )}

          {/* Result with ref for scroll */}
          {result && (
            <div ref={resultRef}>
              <Result result={result} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;