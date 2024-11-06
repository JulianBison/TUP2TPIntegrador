from flask import Flask, jsonify
from flask_cors import CORS
import requests
import json  # Importa el módulo JSON para escribir en un archivo

app = Flask(__name__)
CORS(app)

@app.route('/api/cotizaciones', methods=['GET'])
def obtener_cotizaciones():
    try:
        # Realiza la solicitud a la API externa
        response = requests.get("https://dolarapi.com/v1/cotizaciones")
        response.raise_for_status()
        data = response.json()

        # Guarda los datos en un archivo JSON llamado cotizaciones.json
        with open('./cotizaciones.json', 'w') as archivo_json:
            json.dump(data, archivo_json, indent=4)  # Usa indent=4 para un formato legible

        return jsonify(data)
    except requests.RequestException:
        return jsonify({"error": "Error al obtener datos"}), 500

if __name__ == '__main__':
    app.run(debug=True)

