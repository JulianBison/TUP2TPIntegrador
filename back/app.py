from flask import Flask, render_template, jsonify
import requests
from datetime import datetime

app = Flask(__name__)

@app.route('/')
def index():
    # Renderiza la página principal
    return render_template('index.html')

@app.route('/cotizaciones')
def obtener_cotizaciones():
    # Llamada a la API para obtener las cotizaciones
    try:
        response = requests.get("https://dolarapi.com/v1/cotizaciones")
        data = response.json()
    except Exception as e:
        data = {"error": str(e)}
    
    return jsonify(data)

@app.route('/actualizar')
def actualizar_fecha():
    # Ruta para mostrar la última fecha de actualización
    fecha_actualizacion = datetime.now().strftime("%d de %B de %Y, %H:%M")
    return jsonify({"fecha": fecha_actualizacion})

if __name__ == '__main__':
    app.run(debug=True)
