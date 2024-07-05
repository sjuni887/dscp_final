from flask import Flask, request, jsonify
import pickle
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load models
with open('models/rf_model_death.pkl', 'rb') as file:
    death_model = pickle.load(file)

with open('models/rf_model_icu.pkl', 'rb') as file:
    icu_model = pickle.load(file)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    app.logger.debug(f'Received data: {data}')
    
    input_data = np.array([[
        data['age'], data['rcri_score'], data['anemia_category_mapped'], data['preop_egfr'],
        data['grade_kidney_disease_mapped'], data['preop_transfusion'], data['intraop'], data['postop_within_30days'],
        data['transfusion_intra_postop'], data['transfusion_category_mapped'], data['surg_risk_category_mapped'],
        data['grade_kidney_category_mapped'], data['anemia_binned_mapped'], data['rdw_15_7_mapped'],
        data['asa_category_binned_mapped'], data['male_mapped'], data['ga_mapped'], data['emergency_mapped'],
        data['race_chinese'], data['race_indian'], data['race_malay'], data['race_others'],
        data['creatine_rcri_mapped'], data['dm_insulin_mapped'], data['chf_rcri_mapped'],
        data['ihd_rcri_mapped'], data['cva_rcri_mapped']
    ]])

    death_prediction = death_model.predict(input_data)[0]
    death_probability = death_model.predict_proba(input_data)[0][1]

    icu_prediction = icu_model.predict(input_data)[0]
    icu_probability = icu_model.predict_proba(input_data)[0][1]

    response = {
        'death_prediction': int(death_prediction),
        'death_probability': float(death_probability),
        'icu_prediction': int(icu_prediction),
        'icu_probability': float(icu_probability)
    }

    app.logger.debug(f'Sending response: {response}')
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
