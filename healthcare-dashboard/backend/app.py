from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS
import os
import pandas as pd

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
CORS(app)

# User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)

def create_app():
    with app.app_context():
        db.create_all()
    return app

# Registration endpoint
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_user = User(username=data['username'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify(message="User registered successfully"), 201

# Login endpoint
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(username=data['username']).first()
    if user and bcrypt.check_password_hash(user.password, data['password']):
        return jsonify(message="Login successful"), 200
    return jsonify(message="Invalid credentials"), 401

# Load patient data from CSV
def load_patient_data():
    if os.path.exists('patient_data.csv'):
        return pd.read_csv('patient_data.csv')
    else:
        return pd.DataFrame(columns=['IndexNo', 'Age', 'RCRI score', 'Anemia category', 'PreopEGFRMDRD', 
                                     'Grade of Kidney Disease', 'Preoptransfusion within 30 days', 'Intraop', 
                                     'Postop within 30 days', 'Transfusion intra and postop', 
                                     'Transfusion Intra and Postop Category', 'Surgical Risk Category', 
                                     'Grade of Kidney Category', 'Anemia Category Binned', 'RDW15.7', 
                                     'ASA Category Binned', 'Gender', 'Anaesthesia Type', 'Surgery Priority', 
                                     'Race', 'Creatine RCRI Category', 'DM Insulin Category', 'CHF RCRI Category', 
                                     'IHD RCRI Category', 'CVA RCRI Category'])

# Save patient data to CSV
def save_patient_data(df):
    df.to_csv('patient_data.csv', index=False)

# Fetch all patient data
@app.route('/patients', methods=['GET'])
def get_patients():
    df = load_patient_data()
    return df.to_json(orient='records'), 200

# Add new patient data
@app.route('/patients', methods=['POST'])
def add_patient():
    data = request.json
    df = load_patient_data()
    df = df.append(data, ignore_index=True)
    save_patient_data(df)
    return jsonify(message="Patient data added successfully"), 201

# Edit existing patient data
@app.route('/patients/<int:index>', methods=['PUT'])
def edit_patient(index):
    data = request.json
    df = load_patient_data()
    if 0 <= index < len(df):
        df.loc[index] = data
        save_patient_data(df)
        return jsonify(message="Patient data updated successfully"), 200
    else:
        return jsonify(message="Invalid index"), 404

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
