class Moneda:
    def __init__(self, nombre):
        self.cargar_nombre(nombre)
    def cargar_nombre(self, nombre):
        self.nombre = nombre
    def mostrar_nombre(self):
        return self.nombre


class Tipo(Moneda):
    def __init__(self, tipo, moneda):
        self.cargar_tipo(tipo)
        Moneda.cargar_nombre(self, moneda)
    # def __init__(self):
    #     pass
    def cargar_tipo(self, tipo):
        self.tipo = tipo
    def mostrar_tipo(self):
        return self.tipo
    def __str__(self):
        return f'La moneda es {self.nombre}, y el tipo es {self.tipo}'
    def cargar_cotizacion(self, cotizacion):
        self.cotizaciones.append(cotizacion)
    

class Cotizaciones:
    def __init__(self, actualizacion, valor_compra, valor_venta):
        self.cargar_actualizacion(actualizacion)
        self.cargar_venta(valor_venta)
        self.cargar_compra(valor_compra)
    def cargar_actualizacion(self, actualizacion):
        self.actualizacion = actualizacion
    def mostrar_actualizacion(self):
        return self.actualizacion
    def cargar_venta(self, valor_venta):
        self.valor_venta = valor_venta
    def mostrar_venta(self):
        return self.valor_venta
    def cargar_compra(self, valor_compra):
        self.valor_compra = valor_compra
    def mostrar_compra(self):
        return self.valor_compra
    def __str__(self):
        return f'Actualizado {self.actualizacion}, Venta {self.valor_venta}, Compra {self.valor_compra}'

moneda1 = Tipo("oficial", "dolar")
moneda2 = Tipo("oficial", "euro")
moneda3 = Tipo("", "")
moneda3.cargar_tipo("blue")
moneda3.cargar_nombre("dolar")
# mostrar1 = moneda1.mostrar_nombre()
# mostrar2 = moneda1.mostrar_tipo()
print(moneda1)
print(moneda2)
print(moneda3)

cotizacion1 = Cotizaciones("Hoy", 900, 800)
print(cotizacion1)