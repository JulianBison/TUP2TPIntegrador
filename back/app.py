from flask import Flask, jsonify, send_from_directory, request
from flask_cors import CORS  # Importa CORS
from abc import ABC, abstractmethod
from datetime import datetime, timedelta
import requests,json,os

class Moneda(ABC):
    @abstractmethod
    def __init__ (self, nombre):
        self.nombre = nombre
    @abstractmethod
    def cargar_nombre(self, nombre):
        self.nombre = nombre
    @abstractmethod      
    def mostrar_nombre(self):
        return self.nombre

class Tipo(Moneda):
    def __init__ (self, moneda, tipo):
        super().__init__(moneda)
        self.cargar_tipo(tipo)
        self.cotizaciones = []
    
    def cargar_nombre(self, nombre):
        return super().cargar_nombre(nombre)

    def cargar_tipo(self,tipo):
        
        self.tipo = tipo
    def mostrar_tipo(self):
        return self.tipo
    def mostrar_nombre(self):
        return super().mostrar_nombre()
    
    def __str__(self):
        if self.cotizaciones:
            return f"La moneda es: {self.mostrar_nombre()} {self.mostrar_tipo()} {self.cotizaciones[len(self.cotizaciones)-1]}"
        else:
            return f"La moneda es: {self.nombre} {self.tipo} sin cotizaciones"
    def cargarcotizacion(self,cotizacion):
        self.cotizaciones.append(cotizacion)
    def mostrarcotizaciones(self):
        return self.cotizaciones
    def ultimacotizacion(self):
        return self.cotizaciones[-1]

    def json_actual(self):
        return {'moneda': self.mostrar_nombre(), 
            'tipo': self.mostrar_tipo(),
            'venta': self.ultimacotizacion().mostrarventa(), 
            'compra': self.ultimacotizacion().mostrarcompra(),
            'fecha': self.ultimacotizacion().mostrarfecha()
            }
    
class Cotizacion:
    def __init__(self,venta,compra,fecha):
        self.cargarventa(venta)
        self.cargarcompra(compra)
        self.cargarfecha(fecha)
    def cargarcompra(self,compra):
        self.compra = compra
    def cargarventa(self,venta):
        self.venta = venta
    def cargarfecha(self,fecha):
        self.fecha = fecha
    def mostrarcompra(self):
        return self.compra
    def mostrarventa(self):
        return self.venta
    def mostrarfecha(self):
        return self.fecha
    def __str__(self):
        return f"El precio de compra es: {self.mostrarcompra()}, el precio de venta es: {self.mostrarventa()} y la fecha de actualizacion es {self.mostrarfecha()}"

app = Flask(__name__)
CORS(app, supports_credentials=True, resources={r"/api/*": {"origins": "*"}}) # Activa CORS en toda la aplicación

# Ruta del archivo JSON
json_file_path = os.path.join(os.path.dirname(__file__), "cotizaciones.json")

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
        # Realiza la primer solicitud a la API para obtener los datos de todos los valores
        response = requests.get("https://dolarapi.com/v1/dolares")
        response.raise_for_status()
        listamonedas = []
        for cambio in response.json():
            moneda=Tipo(cambio['moneda'],cambio['nombre'])
            cotizacion=Cotizacion(cambio['venta'],cambio['compra'],cambio['fechaActualizacion'])
            moneda.cargarcotizacion(cotizacion)
            listamonedas.append(moneda)

        # Realiza una segunda solicitud a la API para obtener los datos de cotizaciones empezando en 1 para no repetir dolar oficial
        response2 = requests.get("https://dolarapi.com/v1/cotizaciones")
        response2.raise_for_status()
        for cambio in response2.json()[1:]:
            moneda=Tipo(cambio['moneda'],cambio['nombre'])
            cotizacion=Cotizacion(cambio['venta'],cambio['compra'],cambio['fechaActualizacion'])
            moneda.cargarcotizacion(cotizacion)
            listamonedas.append(moneda)
        
        cotizaciones=[moneda.json_actual() for moneda in listamonedas]
        
        
        # Guarda los datos en el archivo JSON con codificación UTF-8
        with open(json_file_path, "w", encoding="utf-8") as f:
            json.dump({"cotizaciones": cotizaciones, "ultima_actualizacion": datetime.now().isoformat()},
                      f, ensure_ascii=False, indent=4)

        return {"cotizaciones": cotizaciones, "ultima_actualizacion": datetime.now().isoformat()}

    except requests.RequestException as e:
        print(f"Error al obtener los datos de la API: {e}")
        return {"error": "Error al obtener datos de la API"}, 500

def obtener_historico(tipo_dolar, fecha_inicio, fecha_fin, valores):
    fechainicial = datetime.strptime(fecha_inicio, "%Y-%m-%d")
    fechafinal = datetime.strptime(fecha_fin, "%Y-%m-%d")
    delta_dias = (fechafinal - fechainicial) / (valores - 1)
    datosgrafica = []

    for cont in range(valores):
        fecha_actual = fechainicial + delta_dias * cont
        fecha_str = fecha_actual.strftime("%Y/%m/%d")
        url = (f"https://api.argentinadatos.com/v1/cotizaciones/dolares/{tipo_dolar}/{fecha_str}")
        try:
            response = requests.get(url)
            response.raise_for_status()
            cotizacion_data = response.json()
            
            cotizacion = Cotizacion(
                venta=cotizacion_data['venta'],
                compra=cotizacion_data['compra'],
                fecha=cotizacion_data['fecha']
            )
            
            datosgrafica.append({
                'fecha': cotizacion.fecha,
                'venta': cotizacion.venta,
                'compra': cotizacion.compra
            })
        except requests.RequestException as e:
            print(f"Error fetching data for {fecha_str}: {e}")

    return jsonify(datosgrafica)


@app.route('/api/historico/<tipo_dolar>/<fecha_inicio>/<fecha_fin>/<int:valores>')
def api_historico(tipo_dolar, fecha_inicio, fecha_fin, valores):
    return obtener_historico(tipo_dolar, fecha_inicio, fecha_fin, valores)


@app.route('/api/cotizaciones', methods=['GET'])
def obtener_cotizaciones():
    data = obtener_y_guardar_cotizaciones()
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)


@app.route('/api/contacto/', methods=['POST', 'OPTIONS'])
def contacto():
    if request.method == 'OPTIONS':
        # Responde a la solicitud preflight con un estado 200 y headers de CORS
        response = app.response_class(status=200)
        response.headers['Access-Control-Allow-Origin'] = 'http://127.0.0.1:5500'
        response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        response.headers['Access-Control-Allow-Credentials'] = 'true'
        return response

    # Procesa la solicitud POST aquí
    data = request.get_json()
    # Realiza el procesamiento que necesites con `data`
    return jsonify({"status": "Contacto recibido", "data": data}), 200

if __name__ == "__main__":
    app.run(port=5000)

