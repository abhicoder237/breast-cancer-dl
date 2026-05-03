const Result = ({ result }) => {
  const isMalignant = result.prediction === 1;

  return (
    <div
      className={`mt-8 p-6 rounded-2xl shadow-lg border-2 ${
        isMalignant
          ? "bg-red-50 border-red-400"
          : "bg-green-50 border-green-400"
      }`}
    >
      {/* Icon */}
      <div className="text-center text-6xl mb-4">
        {isMalignant ? "⚠️" : "✅"}
      </div>

      {/* Result */}
      <h2
        className={`text-center text-3xl font-bold mb-2 ${
          isMalignant ? "text-red-600" : "text-green-600"
        }`}
      >
        {result.prediction_label}
      </h2>

      {/* Confidence */}
      <p className="text-center text-gray-500 mb-4">
        Confidence:{" "}
        <span className="font-semibold">
          {(result.confidence * 100).toFixed(2)}%
        </span>
      </p>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
        <div
          className={`h-4 rounded-full transition-all ${
            isMalignant ? "bg-red-500" : "bg-green-500"
          }`}
          style={{ width: `${(result.confidence * 100).toFixed(2)}%` }}
        />
      </div>

      {/* Warning */}
      {isMalignant && (
        <p className="text-center text-red-500 text-sm font-semibold">
          ⚠️ Please consult a doctor immediately!
        </p>
      )}
      {!isMalignant && (
        <p className="text-center text-green-500 text-sm font-semibold">
          ✅ No cancer detected! Stay healthy!
        </p>
      )}
    </div>
  );
};

export default Result;