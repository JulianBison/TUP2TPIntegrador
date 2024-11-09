fetch("http://127.0.0.1:5000/api/cotizaciones") // http://127.0.0.1:5000/static/cotizaciones.json" &&
  .then(response => response.json())
  .then(data => {
    console.log(data);
    if (data.cotizaciones) {
      // Itera sobre las cotizaciones y las agrega al DOM
      data.cotizaciones.forEach(cotizacion => {
        let nombre = cotizacion.nombre;
        agregarCotizacion(cotizacion.moneda,cotizacion.tipo,cotizacion.venta, cotizacion.compra, cotizacion.fecha);
      });
      actualizarFecha(data.ultima_actualizacion);
    }
  })
  .catch(error => {
    console.error("Error al obtener las cotizaciones:", error);
    console.log("Intentar traer del cache")
    fetch("../back/cotizaciones.json")
    .then(response => response.json())
    .then(data => {
    console.log(data);
    if (data.cotizaciones) {
      // Itera sobre las cotizaciones y las agrega al DOM
      data.cotizaciones.forEach(cotizacion => {
        agregarCotizacion(cotizacion.moneda,cotizacion.tipo,cotizacion.venta, cotizacion.compra, cotizacion.fecha);
      });
      actualizarFecha(data.ultima_actualizacion);
    }
  })
  });

function agregarCotizacion(moneda,tipo, venta, compra,fecha) {
  let contenedor = document.querySelector(".principal_tarjeta");
  let tarjeta = document.getElementsByClassName("tarjeta")[0].cloneNode(true);
  let fechaFormateada = '';
  let nombreTarjeta
  fechaFormateada = fechaFormateada.concat(fecha.slice(0,10)," ",fecha.slice(11,19));
  tarjeta.querySelector("#nombre-moneda").innerHTML = moneda;
  tarjeta.querySelector("#tipo").innerHTML = tipo;
  tarjeta.querySelector("#precio-compra").innerHTML ='Compra: ' + compra;
  tarjeta.querySelector("#precio-venta").innerHTML ='Venta: ' +  venta;
  tarjeta.querySelector("#fecha-actualizacion").innerHTML = 'Fecha actualizacion: <br>' + fechaFormateada;
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
