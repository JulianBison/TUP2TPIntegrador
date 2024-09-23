

fetch("https://dolarapi.com/v1/cotizaciones")
  .then(response => response.json())
  .then(data => {
    console.log(data); // Verifica los datos en la consola

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