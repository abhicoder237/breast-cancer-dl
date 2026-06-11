from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pickle
import os
from tensorflow.keras.models import load_model

app = Flask(__name__)
CORS(app)

# Absolute paths banao - kahin se bhi run karo, sahi milega
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, '..', 'models', 'breast_cancer_model.h5')
SCALER_PATH = os.path.join(BASE_DIR, '..', 'models', 'scaler.pkl')

print("Loading model from:", MODEL_PATH)
model = load_model(MODEL_PATH)

print("Loading scaler from:", SCALER_PATH)
with open(SCALER_PATH, 'rb') as f:
    scaler = pickle.load(f)

print("✅ Model aur Scaler loaded!")


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

        features = np.array(features).reshape(1, -1)
        features_scaled = scaler.transform(features)
        prediction_prob = model.predict(features_scaled)
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