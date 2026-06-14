from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pandas as pd
import pickle
import os

app = Flask(__name__)
CORS(app)

# Absolute paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
WEIGHTS_PATH = os.path.join(BASE_DIR, '..', 'models', 'model_weights.pkl')
SCALER_PATH = os.path.join(BASE_DIR, '..', 'models', 'scaler.pkl')

print("Loading weights from:", WEIGHTS_PATH)
with open(WEIGHTS_PATH, 'rb') as f:
    weights = pickle.load(f)

# weights unpack karo
W1, b1, W2, b2, W3, b3 = weights

print("Loading scaler from:", SCALER_PATH)
with open(SCALER_PATH, 'rb') as f:
    scaler = pickle.load(f)

print("✅ Weights aur Scaler loaded!")

FEATURE_NAMES = [
    'radius_mean', 'texture_mean', 'perimeter_mean', 'area_mean',
    'smoothness_mean', 'compactness_mean', 'concavity_mean',
    'concave points_mean', 'symmetry_mean', 'fractal_dimension_mean',
    'radius_se', 'texture_se', 'perimeter_se', 'area_se',
    'smoothness_se', 'compactness_se', 'concavity_se',
    'concave points_se', 'symmetry_se', 'fractal_dimension_se',
    'radius_worst', 'texture_worst', 'perimeter_worst', 'area_worst',
    'smoothness_worst', 'compactness_worst', 'concavity_worst',
    'concave points_worst', 'symmetry_worst', 'fractal_dimension_worst'
]


def relu(x):
    return np.maximum(0, x)


def sigmoid(x):
    return 1 / (1 + np.exp(-x))


def predict_manual(X):
    # Layer 1
    z1 = relu(X @ W1 + b1)
    # Layer 2
    z2 = relu(z1 @ W2 + b2)
    # Output
    z3 = sigmoid(z2 @ W3 + b3)
    return z3


@app.route('/', methods=['GET'])
def home():
    return jsonify({
        'message': 'Breast Cancer Classification API',
        'status': 'Running ✅'
    })


@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        if not data or 'features' not in data:
            return jsonify({
                'error': 'Features missing in request!',
                'status': 'failed'
            }), 400

        features = data['features']

        if len(features) != 30:
            return jsonify({
                'error': f'Expected 30 features, got {len(features)}',
                'status': 'failed'
            }), 400

        # DataFrame banao with correct feature names
        features_df = pd.DataFrame([features], columns=FEATURE_NAMES)

        # Scale karo
        features_scaled = scaler.transform(features_df)

        # Manual forward pass
        prediction_prob = predict_manual(features_scaled)
        prediction = int(prediction_prob[0][0] > 0.5)

        return jsonify({
            'prediction': prediction,
            'prediction_label': 'Malignant' if prediction == 1 else 'Benign',
            'confidence': float(prediction_prob[0][0]),
            'status': 'success'
        })

    except Exception as e:
        return jsonify({
            'error': str(e),
            'status': 'failed'
        }), 500


@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy'})


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)