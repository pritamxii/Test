from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)  # This allows your HTML file to connect to Python

DATA_FILE = 'habit_data.json'

@app.route('/save', methods=['POST'])
def save_data():
    try:
        user_data = request.json
        with open(DATA_FILE, 'w') as f:
            json.dump(user_data, f, indent=4)
        return jsonify({"status": "success", "message": "Data synced to server!"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/load', methods=['GET'])
def load_data():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'r') as f:
            return jsonify(json.load(f))
    return jsonify({"habits": {}, "notes": {}})

if __name__ == '__main__':
    # Run the server on port 5000
    print("Server starting at http://127.0.0.1:5000")
    app.run(debug=True, port=5000)
