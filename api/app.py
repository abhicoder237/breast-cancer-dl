
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pickle
from tensorflow.keras.models import load_model

# create flask app
app = Flask(__name__)
CORS(app)   

# Model aur Scaler  loading
model = load_model('../models/breast_cancer_model.h5')

with open('../models/scaler.pkl', 'rb') as f:
    scaler = pickle.load(f)

print(" Model aur Scaler loaded")

# Home Route
@app.route('/', methods=['GET'])
def home():
    return jsonify({
        'message': 'Breast Cancer Classification API',
        'status': 'Running '
    })

# Prediction Route
@app.route('/predict', methods=['POST'])
def predict():
    try:
         
        data = request.get_json()
        features = data['features']
        
        
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
        }), 400

 
if __name__ == '__main__':
    app.run(debug=True, port=5000)