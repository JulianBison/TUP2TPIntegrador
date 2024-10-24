from abc import ABC, abstractmethod
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
    def __init__ (self, tipo, moneda):
        super().__init__(moneda)
        self.cargar_nombre(tipo)
        self.cotizaciones = []
        
    def cargar_nombre(self,tipo):
        self.tipo = tipo
    def mostrar_nombre(self):
        return self.tipo
    def __str__(self):
        if self.cotizaciones:
            return f"La moneda es: {self.nombre} {self.tipo} {self.cotizaciones[len(self.cotizaciones)-1]}"
        else:
            return f"La moneda es: {self.nombre} {self.tipo} sin cotizaciones"
    def cargarcotizacion(self,cotizacion):
        self.cotizaciones.append(cotizacion)
    def mostrarcotizacion(self):
        return self.cotizaciones
    
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
        return f"El precio de compra es: {self.compra}, el precio de venta es: {self.venta} y la fecha de actualizacion es {self.fecha}"
        

moneda1 = Tipo("oficial","dolar")

cotizacion1=Cotizacion(900,950,"20121009")
moneda1.cargarcotizacion(cotizacion1)

print(moneda1)

print(cotizacion1)
print(moneda1.cotizaciones[0])

moneda2 = Tipo("","")
moneda2.cargar_nombre("Dolar")
moneda2.cargar_nombre("Oficial")
print(moneda2)