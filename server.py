from flask import Flask, jsonify, render_template
from flask_cors import CORS
import requests
import json
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)

DATA_FILE = "data.json"

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/stats/<int:universe_id>")
def stats(universe_id):
    url = f"https://games.roblox.com/v1/games?universeIds={universe_id}"
    r = requests.get(url)
    info = r.json()['data'][0]

    # Historique
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, "r") as f:
            history = json.load(f)
    else:
        history = []

    today = datetime.now().strftime("%Y-%m-%d")
    entry = {"date": today, "playing": info["playing"], "visits": info["visits"], "favorites": info["favoritedCount"]}

    if not history or history[-1]["date"] != today:
        history.append(entry)
        with open(DATA_FILE, "w") as f:
            json.dump(history, f)

    return jsonify({"current": info, "history": history})

if __name__ == "__main__":
    app.run(port=5000, debug=True)
