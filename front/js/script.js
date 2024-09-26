

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
/*fetch("https://dolarapi.com/v1/cotizaciones")
  .then(response => response.json())
  .then(data => {
    ; // Verifica los datos en la consola

    // Buscamos los datos por nombre de moneda y casa
    const dolarOficial = data.find(item => item.moneda === 'USD' && item.casa === 'oficial');
    const euro = data.find(item => item.moneda === 'EUR' && item.casa === 'oficial');
    const realBrasileno = data.find(item => item.moneda === 'BRL' && item.casa === 'oficial');
    const pesoChileno = data.find(item => item.moneda === 'CLP' && item.casa === 'oficial');
    const pesoUruguayo = data.find(item => item.moneda === 'UYU' && item.casa === 'oficial');

                 
    // Asignamos los valores de compra y venta a las tarjetas
    if (dolarOficial) {
      document.getElementById("dolar_oficial_compra").innerHTML = dolarOficial.compra || "No disponible";
      document.getElementById("dolar_oficial_venta").innerHTML = dolarOficial.venta || "No disponible";
    } else {
      console.error("No se encontraron datos para el Dólar Oficial.");
    }

    if (euro) {
      document.getElementById("euro_compra").innerHTML = euro.compra || "No disponible";
      document.getElementById("euro_venta").innerHTML = euro.venta || "No disponible";
    } else {
      console.error("No se encontraron datos para el Euro.");
    }

    if (realBrasileno) {
        document.getElementById("real_brasileno_compra").innerHTML = realBrasileno.compra || "No disponible";
        document.getElementById("real_brasileno_venta").innerHTML = realBrasileno.venta || "No disponible";
      } else {
        console.error("No se encontraron datos para el Real Brasileño.");
      }
  
      if (pesoChileno) {
        document.getElementById("peso_chileno_compra").innerHTML = pesoChileno.compra || "No disponible";
        document.getElementById("peso_chileno_venta").innerHTML = pesoChileno.venta || "No disponible";
      } else {
        console.error("No se encontraron datos para el Peso Chileno.");
      }
  
      if (pesoUruguayo) {
        document.getElementById("peso_uruguayo_compra").innerHTML = pesoUruguayo.compra || "No disponible";
        document.getElementById("peso_uruguayo_venta").innerHTML = pesoUruguayo.venta || "No disponible";
      } else {
        console.error("No se encontraron datos para el Peso Uruguayo.");
      }
  })
  .catch(error => {
    console.error("Error al obtener los datos: ", error);
  });
  */