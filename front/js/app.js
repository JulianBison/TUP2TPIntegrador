fetch("../../back/cotizaciones.json") // http://127.0.0.1:5000/static/cotizaciones.json" &&
  .then(response => response.json())
  .then(data => {
    console.log(data);
    if (data.cotizaciones) {
      // Itera sobre las cotizaciones y las agrega al DOM
      data.cotizaciones.forEach(cotizacion => {
        let nombre = cotizacion.nombre;
        agregarCotizacion(nombre, cotizacion.venta, cotizacion.compra);
      });
      actualizarFecha(data.ultima_actualizacion);
    }
  })
  .catch(error => {
    console.error("Error al obtener las cotizaciones:", error);
  });

function agregarCotizacion(nombre, venta, compra) {
  let contenedor = document.querySelector(".principal_tarjeta");
  let tarjeta = document.getElementsByClassName("tarjeta")[0].cloneNode(true);

  tarjeta.querySelector("#tarjeta-prueba").innerHTML = nombre;
  tarjeta.querySelector("#precio-compra").innerHTML = compra;
  tarjeta.querySelector("#precio-venta").innerHTML = venta;
  contenedor.appendChild(tarjeta);
}

// Función para actualizar la fecha de la última actualización
function actualizarFecha(fecha) {
  let fechaActualizada = new Date(fecha);

  // Formateamos la fecha
  let fechaFormateada = fechaActualizada.toLocaleString('es-ES', {
    dateStyle: 'long',
    timeStyle: 'short'
  });

  // Actualizamos el contenido del elemento en el DOM
  let elementoFecha = document.getElementById("ultima_actualizacion");
  
  if (elementoFecha) {
    elementoFecha.innerHTML = fechaFormateada;
  } else {
    console.error("No se encontró el elemento con el id 'ultima_actualizacion'.");
  }
}
