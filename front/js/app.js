if (window.location.href.includes("index.html")) {
  fetch("http://127.0.0.1:5000/api/cotizaciones")
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
}


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
    elementoFecha.innerHTML ="Ultima actualizacion: " + fechaFormateada;
  } else {
    console.error("No se encontró el elemento con el id 'ultima_actualizacion'.");
  }
}

//funcion para esconder el menu al scrollear
let prevScrollPos = window.scrollY;
const nav = document.querySelector('.nav');

window.onscroll = function() {
  let currentScrollPos = window.scrollY;
  
  if (prevScrollPos > currentScrollPos) {
    nav.classList.remove("nav-hidden");
  } else {
    nav.classList.add("nav-hidden");
  }
  
  prevScrollPos = currentScrollPos;
};

if (window.location.href.includes("contacto.html")){
  document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formularioContacto');

    formulario.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita que el formulario se envíe de manera tradicional

        const data = {
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            email: document.getElementById('email').value,
            mensaje: document.getElementById('mensaje').value
        };

        fetch('http://127.0.0.1:5000/api/contacto/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: "cors",
            body: JSON.stringify(data) // Convierte los datos a formato JSON
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            alert('Contacto enviado exitosamente.');
            formulario.reset(); // Resetea el formulario después de enviar
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Hubo un error al enviar el contacto.');
        });
    });
});}   


