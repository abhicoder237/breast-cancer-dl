 


# 🎗️ Breast Cancer Classification using Deep Learning

![Python](https://img.shields.io/badge/Python-3.9+-blue)
![TensorFlow](https://img.shields.io/badge/TensorFlow-2.x-orange)
![React](https://img.shields.io/badge/React-18-blue)
![Flask](https://img.shields.io/badge/Flask-2.x-black)
![Tailwind](https://img.shields.io/badge/Tailwind-3.x-cyan)

> AI Powered Breast Cancer Detection System using Deep Neural Networks

---

## 📌 Project Overview

This project classifies breast cancer tumors as **Malignant** or **Benign** 
using a Deep Learning model trained on the 
Wisconsin Breast Cancer Dataset.

---

## 🎯 Results

| Metric | Score |
|--------|-------|
| Accuracy | 96% |
| Malignant Recall | 98% |
| Benign Precision | 99% |
| F1 Score | 96% |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Deep Learning | TensorFlow / Keras |
| Backend | Flask (Python) |
| Frontend | React + Tailwind CSS |
| Data Processing | Pandas, NumPy, Sklearn |
| Visualization | Matplotlib, Seaborn |

---

---

## 🚀 Setup Instructions

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/breast-cancer-classification.git
cd breast-cancer-classification
```

### 2. Backend Setup
```bash
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

### 3. Run Flask API
```bash
cd api
python app.py
```

### 4. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 📊 Model Architecture

Input Layer  → 30 features
Hidden Layer 1 → 64 neurons (ReLU) + Dropout(0.3)
Hidden Layer 2 → 32 neurons (ReLU) + Dropout(0.2)
Output Layer → 1 neuron (Sigmoid)

---

## 📈 Training Results

- Dataset: Wisconsin Breast Cancer (569 samples)
- Train/Test Split: 80/20
- Epochs: 61 (Early Stopping)
- Optimizer: Adam
- Loss: Binary Crossentropy

---

## 🔥 Features

- ✅ CSV File Upload for batch prediction
- ✅ Manual Input with user friendly labels
- ✅ Real time prediction with confidence score
- ✅ Beautiful React + Tailwind UI
- ✅ REST API with Flask

---

## 👨‍💻 Author

**Abhishek Kumar Singh**

---

## ⚠️ Disclaimer

This project is for educational purposes only.
Always consult a qualified doctor for medical diagnosis.