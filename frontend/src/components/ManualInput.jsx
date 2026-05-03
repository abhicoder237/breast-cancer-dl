import { useState } from "react";

const ManualInput = ({ setResult }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    concave_points_worst: "",
    perimeter_worst: "",
    concave_points_mean: "",
    radius_worst: "",
    perimeter_mean: "",
  });

  const defaultValues = {
    radius_mean: 14.127,
    texture_mean: 19.289,
    area_mean: 654.889,
    smoothness_mean: 0.09636,
    compactness_mean: 0.10434,
    concavity_mean: 0.08880,
    symmetry_mean: 0.18116,
    fractal_dimension_mean: 0.06280,
    radius_se: 0.40517,
    texture_se: 1.21685,
    perimeter_se: 2.86606,
    area_se: 40.33708,
    smoothness_se: 0.00704,
    compactness_se: 0.02548,
    concavity_se: 0.03189,
    concave_points_se: 0.01179,
    symmetry_se: 0.02054,
    fractal_dimension_se: 0.00380,
    texture_worst: 25.677,
    area_worst: 880.583,
    smoothness_worst: 0.13237,
    compactness_worst: 0.25427,
    concavity_worst: 0.27219,
    symmetry_worst: 0.29008,
    fractal_dimension_worst: 0.08395,
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
    setResult(null);
  };

  const handleSubmit = async () => {
    for (let key in formData) {
      if (formData[key] === "") {
        setError("Please fill all fields!");
        return;
      }
    }

    setLoading(true);

    try {
      const features = [
        defaultValues.radius_mean,
        defaultValues.texture_mean,
        parseFloat(formData.perimeter_mean),
        defaultValues.area_mean,
        defaultValues.smoothness_mean,
        defaultValues.compactness_mean,
        defaultValues.concavity_mean,
        parseFloat(formData.concave_points_mean),
        defaultValues.symmetry_mean,
        defaultValues.fractal_dimension_mean,
        defaultValues.radius_se,
        defaultValues.texture_se,
        defaultValues.perimeter_se,
        defaultValues.area_se,
        defaultValues.smoothness_se,
        defaultValues.compactness_se,
        defaultValues.concavity_se,
        defaultValues.concave_points_se,
        defaultValues.symmetry_se,
        defaultValues.fractal_dimension_se,
        parseFloat(formData.radius_worst),
        defaultValues.texture_worst,
        parseFloat(formData.perimeter_worst),
        defaultValues.area_worst,
        defaultValues.smoothness_worst,
        defaultValues.compactness_worst,
        defaultValues.concavity_worst,
        parseFloat(formData.concave_points_worst),
        defaultValues.symmetry_worst,
        defaultValues.fractal_dimension_worst,
      ];

      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ features }),
      });

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError("Something went wrong! Check API.");
    } finally {
      setLoading(false);
    }
  };

  // User Friendly Labels! ✅
  const inputs = [
    {
      name: "concave_points_worst",
      label: "🔬 Tumor Irregularity (Worst)",
      placeholder: "e.g. 0.2654",
      hint: "How irregular is the tumor shape at its worst"
    },
    {
      name: "perimeter_worst",
      label: "📏 Tumor Boundary Size (Worst)",
      placeholder: "e.g. 184.60",
      hint: "Size of tumor boundary at its largest"
    },
    {
      name: "concave_points_mean",
      label: "🔬 Average Tumor Irregularity",
      placeholder: "e.g. 0.1471",
      hint: "Average irregularity of tumor shape"
    },
    {
      name: "radius_worst",
      label: "📐 Tumor Size (Worst)",
      placeholder: "e.g. 25.38",
      hint: "Size of tumor at its largest"
    },
    {
      name: "perimeter_mean",
      label: "📏 Average Tumor Boundary",
      placeholder: "e.g. 122.80",
      hint: "Average size of tumor boundary"
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-xl font-bold text-gray-700 mb-2">
        ✏️ Manual Input
      </h2>
      <p className="text-gray-400 text-sm mb-6">
        Enter tumor measurements — rest will use dataset averages
      </p>

      <div className="grid grid-cols-1 gap-5 mb-6">
        {inputs.map((input) => (
          <div key={input.name}>
            <label className="block text-gray-700 font-semibold mb-1 text-sm">
              {input.label}
            </label>
            <input
              type="number"
              name={input.name}
              value={formData[input.name]}
              onChange={handleChange}
              placeholder={input.placeholder}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-all"
            />
            {/* Hint text */}
            <p className="text-gray-400 text-xs mt-1">
              💡 {input.hint}
            </p>
          </div>
        ))}
      </div>

      {error && (
        <p className="text-red-500 text-sm mb-4 text-center">
          ❌ {error}
        </p>
      )}

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

export default ManualInput;