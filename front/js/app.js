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

document.getElementById('DatosHistorico').addEventListener('submit', function(event) {
  event.preventDefault();
  
  // Retrieve form values
  let dolar = document.getElementById('dolar').value;
  let fechainicio = document.getElementById('fechainicio').value;
  let fechafin = document.getElementById('fechafin').value;
  let valores = parseInt(document.getElementById('valores').value);

  console.log("Tipo dolar:", dolar);
  console.log("Fecha inicio:", fechainicio);
  console.log("Fecha fin:", fechafin);
  console.log("Número de Días:", valores);

  const peticion = `http://127.0.0.1:5000/api/historico/${dolar}/${fechainicio}/${fechafin}/${valores}`;

  fetch(peticion, { mode: 'cors' })
    .then(response => response.json())
    .then(data => {
      if (!data || data.length === 0) {
          console.error('No data received');
          return;
      }
      console.log(data);
      const labels = data.map(item => item.fecha);
      const valoresData = data.map(item => item.compra);

      const chartData = {
          labels: labels,
          datasets: [{
              label: 'Valores',
              data: valoresData,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
          }]
      };
        
      const config = {
          type: 'line',
          data: chartData,
          options: {
              responsive: true,
              scales: {
                  y: {
                      beginAtZero: true
                  }
              }
          }
      };

      const myChart = new Chart(
          document.getElementById('Grafico'),
          config
      );
    })
    .catch(error => console.error('Error en la petición:', error));
});