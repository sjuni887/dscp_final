from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS
import os
import requests
import time

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

# LLM Response endpoint
@app.route('/llm_response', methods=['POST'])
def llm_response():
    data = request.json
    prompt = data['prompt']
    replicate_api_token = data.get('replicate_api_token')

    headers = {
        'Authorization': f'Token {replicate_api_token}',
        'Content-Type': 'application/json'
    }

    payload = {
        'version': 'df7690f1994d94e96ad9d568eac121aecf50684a0b0963b25a41cc40061269e5',
        'input': {
            'prompt': prompt,
            'temperature': data.get('temperature', 0.1),
            'top_p': data.get('top_p', 0.9),
            'max_length': data.get('max_length', 512),
            'repetition_penalty': 1,
        }
    }

    response = requests.post('https://api.replicate.com/v1/predictions', json=payload, headers=headers)
    prediction = response.json()

    if 'urls' in prediction:
        get_url = prediction['urls']['get']
        while True:
            result = requests.get(get_url, headers=headers).json()
            if result['status'] in ['succeeded', 'failed']:
                break
            time.sleep(1)
        if result['status'] == 'succeeded' and 'output' in result:
            return jsonify(output=result['output']), 200
        else:
            return jsonify(error="Failed to generate response"), 500
    else:
        return jsonify(error="Failed to generate response"), 500

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
