from flask import Flask, request, jsonify, send_from_directory, render_template
import pandas as pd
import random
from flask_cors import CORS
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

app = Flask(
    __name__,
    template_folder="../templates"
)
CORS(app)


df = pd.read_csv(os.path.join(BASE_DIR, "etrain_delays.csv"))


@app.route("/")
def home():
    return render_template("index.html")

@app.route("/index.html")
def index_page():
    return render_template("index.html")

@app.route("/login.html")
def login_page():
    return render_template("login.html")

@app.route("/about.html")
def about_page():
    return render_template("about.html")

@app.route("/objectives.html")
def objectives_page():
    return render_template("objectives.html")

@app.route("/procedure.html")
def procedure_page():
    return render_template("procedure.html")

@app.route("/registration.html")
def registration_page():
    return render_template("registration.html")

@app.route("/result.html")
def result_page():
    return render_template("result.html")

@app.route("/<path:filename>")
def serve_static(filename):
    return send_from_directory("../templates", filename)

@app.route("/etrain_delays.csv")
def serve_csv():
    return send_from_directory(BASE_DIR, "etrain_delays.csv")

def dummy_predict(row):
    delay = int(row.get("delay_minutes", 0))

    if delay > 20:
        return "High Delay"
    elif delay > 5:
        return "Moderate Delay"
    else:
        return "Low Delay"

def generate_accuracy():
    return round(random.uniform(70, 98), 2)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    prediction = dummy_predict(data)
    accuracy = generate_accuracy()

    return jsonify({
        "prediction": prediction,
        "accuracy": f"{accuracy}%"
    })

@app.route("/get_accuracy/<train_number>")
def get_accuracy(train_number):
    records = df[df["train_number"] == int(train_number)]

    if records.empty:
        return jsonify({"error": "Train not found"}), 404

    results = []
    for _, row in records.iterrows():
        results.append({
            "predicted_delay": dummy_predict(row),
            "accuracy": f"{generate_accuracy()}%"
        })

    return jsonify(results)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
