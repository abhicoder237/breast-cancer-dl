import { useState } from "react";
import Papa from "papaparse";

const CSVUpload = ({ setResult }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError(null);
    setResult(null);
  };

  const handleSubmit = async () => {
    if (!file) {
      setError("Please select a CSV file!");
      return;
    }

    setLoading(true);

    Papa.parse(file, {
      header: true,
      complete: async (results) => {
        try {
          const row = results.data[0];

          // Features extract karo
          const features = [
            parseFloat(row["radius_mean"]),
            parseFloat(row["texture_mean"]),
            parseFloat(row["perimeter_mean"]),
            parseFloat(row["area_mean"]),
            parseFloat(row["smoothness_mean"]),
            parseFloat(row["compactness_mean"]),
            parseFloat(row["concavity_mean"]),
            parseFloat(row["concave points_mean"]),
            parseFloat(row["symmetry_mean"]),
            parseFloat(row["fractal_dimension_mean"]),
            parseFloat(row["radius_se"]),
            parseFloat(row["texture_se"]),
            parseFloat(row["perimeter_se"]),
            parseFloat(row["area_se"]),
            parseFloat(row["smoothness_se"]),
            parseFloat(row["compactness_se"]),
            parseFloat(row["concavity_se"]),
            parseFloat(row["concave points_se"]),
            parseFloat(row["symmetry_se"]),
            parseFloat(row["fractal_dimension_se"]),
            parseFloat(row["radius_worst"]),
            parseFloat(row["texture_worst"]),
            parseFloat(row["perimeter_worst"]),
            parseFloat(row["area_worst"]),
            parseFloat(row["smoothness_worst"]),
            parseFloat(row["compactness_worst"]),
            parseFloat(row["concavity_worst"]),
            parseFloat(row["concave points_worst"]),
            parseFloat(row["symmetry_worst"]),
            parseFloat(row["fractal_dimension_worst"]),
          ];

          // API call karo
          const response = await fetch(
            "http://127.0.0.1:5000/predict",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ features }),
            }
          );

          const data = await response.json();
          setResult(data);
        } catch (err) {
          setError("Something went wrong! Check API.");
        } finally {
          setLoading(false);
        }
      },
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-xl font-bold text-gray-700 mb-6">
        📁 Upload CSV File
      </h2>

      {/* File Input */}
      <div className="border-2 border-dashed border-indigo-300 rounded-xl p-8 text-center mb-6 hover:border-indigo-500 transition-all">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="hidden"
          id="csvInput"
        />
        <label
          htmlFor="csvInput"
          className="cursor-pointer"
        >
          <div className="text-5xl mb-3">📂</div>
          <p className="text-gray-500">
            {file ? file.name : "Click to upload CSV file"}
          </p>
        </label>
      </div>

      {/* Error */}
      {error && (
        <p className="text-red-500 text-sm mb-4 text-center">
          ❌ {error}
        </p>
      )}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all disabled:opacity-50"
      >
        {loading ? "Predicting... ⏳" : "Predict 🔍"}
      </button>
    </div>
  );
};

export default CSVUpload;