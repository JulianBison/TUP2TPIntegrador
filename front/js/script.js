

fetch("https://dolarapi.com/v1/dolares")
  .then(response => response.json())
  .then(data => {
  for (i=0; i<data.length; i++){
    agregarCotizacion(data[i].moneda , data[i].nombre, data[i].venta, data[i].compra)
  };
  actualizarFecha(data[0].fechaActualizacion);
  });

fetch("https://dolarapi.com/v1/cotizaciones")
  .then(response => response.json())
  .then(data => {for (i=1; i<data.length; i++){
    agregarCotizacion(data[i].moneda , data[i].nombre , data[i].venta, data[i].compra)}});


function agregarCotizacion(moneda,nombre, venta, compra) {
  var x = document.getElementsByClassName("tarjeta")[0].cloneNode(true);
  x.querySelector(".moneda").innerHTML = "Moneda: " +moneda;
  x.querySelector(".nombre").innerHTML = "Nombre: " +nombre;
  x.querySelector(".precio-venta").innerHTML = "Venta: " + venta;
  x.querySelector(".precio-compra").innerHTML = "Compra: " + compra;

  // Make sure to append to the correct element
  document.getElementsByClassName("principal_tarjeta")[0].appendChild(x);
}
function actualizarFecha(fecha) {
  let fechaFormateada = '';
  fechaFormateada = fechaFormateada.concat(fecha.slice(0,9)," Hora: ",fecha.slice(11,19));
  // Actualizamos el contenido del elemento en el DOM
  let elementoFecha = document.getElementById("ultima_actualizacion");
  
  if (elementoFecha) {
    elementoFecha.innerHTML = fechaFormateada;  // Si el elemento existe, actualizamos el contenido
  } else {
    console.error("No se encontró el elemento con el id 'ultima_actualizacion'.");
  }
}
