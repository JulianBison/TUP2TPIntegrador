fetch("https://dolarapi.com/v1/cotizaciones")
  .then(response => response.json())
  .then(data => {
    console.log(data);
    data.forEach(cotizacion => {
      agregarCotizacion(cotizacion.nombre, cotizacion.venta, cotizacion.compra)
    });
  });

  function agregarCotizacion(nombre, venta, compra){
    let contenedor = document.querySelector(".principal_tarjeta")
    let x = document.getElementsByClassName("tarjeta")[0].cloneNode(true);

    x.querySelector("#tarjeta-prueba").innerHTML = nombre;
    x.querySelector("#precio-compra").innerHTML = compra;
    x.querySelector("#precio-venta").innerHTML = venta;
    contenedor.appendChild(x)
  }