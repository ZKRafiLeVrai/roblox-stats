from flask import Flask, jsonify, render_template
from flask_cors import CORS
import requests
import os

app = Flask(__name__)
CORS(app)  # Permet au front-end de récupérer les données sans blocage CORS

# Remplace ce universeId par celui de ton jeu Roblox
UNIVERSE_ID = "8263709207"

@app.route('/')
def index():
    return render_template("index.html")  # ton fichier HTML principal

@app.route('/stats/<universe_id>')
def stats(universe_id):
    try:
        url = f"https://games.roblox.com/v1/games?universeIds={universe_id}"
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()

        if "data" in data and len(data["data"]) > 0:
            game_data = data["data"][0]
            stats = {
                "name": game_data.get("name"),
                "visits": game_data.get("visits"),
                "favorites": game_data.get("favorites"),
                "players": game_data.get("playing"),
            }
            return jsonify(stats)
        else:
            return jsonify({"error": "No data found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Render fournit le port via la variable d'environnement PORT
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
