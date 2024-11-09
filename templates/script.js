// Hacer la petición a la API del backend Flask
fetch("http://127.0.0.1:5000/api/cotizaciones")
  .then(response => response.json())
  .then(data => {
    data.forEach(cotizacion => {
      agregarCotizacion(cotizacion.nombre, cotizacion.venta, cotizacion.compra);
    });
    actualizarFecha();
  })
  .catch(error => console.error("Error al obtener datos del backend:", error));

// Función para agregar cada cotización en el DOM
function agregarCotizacion(nombre, venta, compra){
    let contenedor = document.querySelector(".principal_tarjeta");
    let x = document.getElementsByClassName("tarjeta")[0].cloneNode(true);

    x.querySelector("#tarjeta-prueba").innerHTML = nombre;
    x.querySelector("#precio-compra").innerHTML = compra;
    x.querySelector("#precio-venta").innerHTML = venta;
    contenedor.appendChild(x);
}

// Función para actualizar la fecha de la última actualización
function actualizarFecha() {
  let fechaActual = new Date();
  let fechaFormateada = fechaActual.toLocaleString('es-ES', {
    dateStyle: 'long',
    timeStyle: 'short'
  });
  document.getElementById("ultima_actualizacion").innerHTML = fechaFormateada;
}
