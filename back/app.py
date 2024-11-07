from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS  # Importa CORS
import requests
import json
import os
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)  # Activa CORS en toda la aplicación

# Ruta del archivo JSON
json_file_path = "cotizaciones.json"

# Ruta para servir el archivo JSON directamente
@app.route('/static/cotizaciones.json')
def servir_json():
    return send_from_directory('.', 'cotizaciones.json')

# Función para obtener y guardar las cotizaciones
def obtener_y_guardar_cotizaciones():
    try:
        # Verifica si el archivo JSON existe
        if not os.path.exists(json_file_path):
            return obtener_datos_api_y_guardar()

        # Si el archivo JSON existe, verifica la fecha de la última actualización
        with open(json_file_path, "r", encoding="utf-8") as f:
            data = json.load(f)
            ultima_actualizacion = datetime.fromisoformat(data.get("ultima_actualizacion", "1970-01-01T00:00:00"))
        
        # Si han pasado más de 5 minutos desde la última actualización, actualizamos los datos
        if datetime.now() - ultima_actualizacion > timedelta(minutes=5):
            return obtener_datos_api_y_guardar()

        # Si no han pasado más de 5 minutos, devuelve los datos almacenados
        return data

    except Exception as e:
        print(f"Error al manejar el archivo JSON: {e}")
        return {"error": "Error al obtener datos"}, 500

# Función para obtener datos de la API y guardar en el archivo JSON
def obtener_datos_api_y_guardar():
    try:
        # Realiza la solicitud a la API
        response = requests.get("https://dolarapi.com/v1/cotizaciones")
        response.raise_for_status()
        cotizaciones = response.json()

        # Guarda los datos en el archivo JSON con codificación UTF-8
        with open(json_file_path, "w", encoding="utf-8") as f:
            json.dump({"cotizaciones": cotizaciones, "ultima_actualizacion": datetime.now().isoformat()},
                      f, ensure_ascii=False, indent=4)

        return {"cotizaciones": cotizaciones, "ultima_actualizacion": datetime.now().isoformat()}

    except requests.RequestException as e:
        print(f"Error al obtener los datos de la API: {e}")
        return {"error": "Error al obtener datos de la API"}, 500

@app.route('/api/cotizaciones', methods=['GET'])
def obtener_cotizaciones():
    data = obtener_y_guardar_cotizaciones()
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
